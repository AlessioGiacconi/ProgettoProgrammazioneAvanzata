import cron from 'node-cron';
import { UsersModel } from '../models/UsersModel';
import logger from '../log/logger';
import dotenv from 'dotenv';

dotenv.config();

const SUSPENSION_DURATION = parseInt(process.env.SUSPENSION_DURATION || '10') * 1000;

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

            logger.info(`User ${user.get('badge_id')} has been suspended for ${elapsedTime / 1000} seconds`);

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
