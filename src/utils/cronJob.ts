/**
 * @file cronJob.ts
 * @description  Questo file definisce un job cron utilizzando la libreria node-cron.
 * Il job cron verifica periodicamente gli utenti sospesi e li riattiva se il periodo di sospensione è scaduto.
 */

import cron from 'node-cron';
import { UsersModel } from '../models/UsersModel';
import logger from '../log/logger';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Durata della sospensione in millisecondi, letta dalle variabili d'ambiente.
 * Default è 3600 secondi (1 ora) se non specificato.
 */
const SUSPENSION_DURATION = parseInt(process.env.SUSPENSION_DURATION || '3600') * 1000;

/**
 * Definizione del job cron schedulato per essere eseguito ogni minuto.
 * Il job controlla gli utenti sospesi e li riattiva se il periodo di sospensione è scaduto.
 */
cron.schedule('* * * * *', async () => {
    try {
        console.log("Cron Job Started")
        const currentTime = new Date().getTime();
        const suspendedUsers = await UsersModel.findAll({
            where: {
                is_suspended: true
            }
        });

        for (const user of suspendedUsers) {

            const updatedAt = user.get('updated_at') as Date;

            const suspensionTime = updatedAt.getTime();
            const elapsedTime = currentTime - suspensionTime;

            if (elapsedTime >= SUSPENSION_DURATION) {
                user.set({
                    is_suspended: false
                });
                await user.save();
                logger.info(`User ${user.get('badge_id')} reactivated after suspension period`);
            }
        }
    } catch (error) {
        logger.error('Error in cron job: ', error);
    }
})
