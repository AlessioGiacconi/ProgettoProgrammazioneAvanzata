import { Request, Response, NextFunction } from 'express';
import { TransitsModel } from '../models/TransitsModel';
import logger from '../log/logger';
import { UsersModel } from '../models/UsersModel';
import { AuthorizationModel } from '../models/AuthorizationModel';
import { Op } from 'sequelize';
import PDFDocument from 'pdfkit';
import { stringify } from 'csv-stringify';

const MAX_UNAUTHORIZED_ATTEMPTS = parseInt(process.env.MAX_UNAUTHORIZED_ATTEMPTS || '5');

export const getAllTransit = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const transits = await TransitsModel.findAll();
        res.json(transits);
    } catch (error) {
        next(error);
    }
};

export const getTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        res.json(transit);
    } else {
        res.status(404).json({error: 'Transit not found'});
    }
};

export const createTransit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { passage, badge, transit_date, violation_dpi } = req.body;

        const user = await UsersModel.findByPk(badge);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.get('role') === 'passage' && user.get('passage_reference') !== passage) {
            return res.status(403).json({ message: 'User with role "passage" can only insert transits for thei reference passage' })
        }

        const authorization = await AuthorizationModel.findOne({
            where: {
                badge: badge,
                passage: passage
            }
        });

        const is_authorized = !!authorization;

        const transit = await TransitsModel.create({
            passage: passage,
            badge: badge,
            transit_date: transit_date,
            is_authorized: is_authorized,
            violation_dpi: violation_dpi
        });

        if(!is_authorized) {
            await user.increment('unauthorized_attempts');
            await user.reload();

            const unauthorizedAttempts = user.get('unauthorized_attempts') as number;

            if (unauthorizedAttempts >= MAX_UNAUTHORIZED_ATTEMPTS) {
                user.set({
                    is_suspended: true,
                    unauthorized_attempts: 0
                })
                await user.save();
                logger.info(`User ${badge} suspended due to excessive unauthorized attempts`);
            }
        }

        logger.info(`Transit created: Badge ${badge}, Status: ${is_authorized ? 'authorized' : 'unauthorized'}`);

        res.status(201).json(transit);
    } catch (error) {
        next(error);
    }
}

export const updateTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {transit_date, violation_dpi} = req.body;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        transit.set({
            transit_date: transit_date,
            violation_dpi: violation_dpi
        });
        await transit.save();
        res.json(transit);
    } else {
        res.status(404).json({ error: 'Transit not found'})
    }
}

export const deleteTransit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const transit = await TransitsModel.findByPk(id);
    if (transit) {
        await transit.destroy();
        res.json({message: 'Transit deleted'});
    } else {
        res.status(404).json({error: 'Transit not found'})
    }
}

export const getAccessStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { badge_id} = req.params;
        const { start_date, end_date} = req.query;

        const transits = await TransitsModel.findAll({
            where: {
                badge: badge_id,
                transit_date: {
                    [Op.between]: [new Date(start_date as string), new Date(end_date as string)]
                }
            },
            attributes: ['passage', 'is_authorized', 'violation_dpi']
        });

        const accessCount = transits.reduce((acc: { [key: number]: {authorized: number, unauthorized: number, violations: number}}, transit) => {
            const passage = transit.get('passage') as number;
            if (!acc[passage]) {
                acc[passage] = { authorized: 0, unauthorized: 0, violations: 0};
            }
            if (transit.get('is_authorized')) {
                acc[passage].authorized += 1;
            } else {
                acc[passage].unauthorized += 1;
            }
            if(transit.get('violation_dpi')) {
                acc[passage].violations += 1;
            }
            return acc
        }, {})  ;

        const totalUnauthorizedAttempts = transits.filter( transit => !transit.get('is_authorized')).length;

        res.status(200).json({accessCount, totalUnauthorizedAttempts});
    } catch (error) {
        next(error);
    }
};

export const downloadReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { start_date, end_date, format } = req.query;

        const transits = await TransitsModel.findAll({
            where: {
                transit_date: {
                    [Op.between]: [new Date(start_date as string), new Date(end_date as string)]
                }
            },
            attributes: ['passage', 'is_authorized', 'violation_dpi']
        });

        const reportData = transits.reduce((acc: { [key: number]: {passage: number, authorized: number, unauthorized: number, violations: number }}, transit) => {
            const passage = transit.get('passage') as number;
            if (!acc[passage]) {
                acc[passage] = { passage: passage,  authorized: 0, unauthorized: 0, violations: 0};
            }
            if (transit.get('is_authorized')) {
                acc[passage].authorized += 1;
            } else {
                acc[passage].unauthorized += 1;
            }
            if (transit.get('violation_dpi')) {
                acc[passage].violations += 1;
            }
            return acc;
        }, {});

        const reportArray = Object.values(reportData);

        if (format === 'csv') {
            res.header('Content-Type', 'text/csv');
            res.attachment('report.csv');

            stringify(reportArray, { header: true}, (err, output) => {
                if (err) {
                    return next(err);
                }
                res.send(output);
            });
        } else if (format === 'pdf') {
            const doc = new PDFDocument();
            res.header('Content-Type', 'application/pdf');
            res.attachment('report.pdf');

            doc.pipe(res);
            doc.text('Transit Report');
            reportArray.forEach(row => {
                doc.text(`Passage: ${row.passage}, Authorized: ${row.authorized}, Uauthorized: ${row.unauthorized}, Violations: ${row.violations}`);
            });
            doc.end();
        } else {
            res.header('Content-Type', 'application/json');
            res.attachment('report.json');
            return res.json(reportArray);
        }
    } catch (error) {
        next(error);
    }
}