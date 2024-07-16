/**
 * @file logger.ts
 * @description Questo file configura e esporta un'istanza di logger utilizzando il modulo winston.
 *              Il logger è configurato per registrare messaggi di log su console e su file.
 */

import { createLogger, format, transports } from 'winston';

/**
 * Crea un'istanza di logger con la configurazione specificata.
 * Il logger registra i messaggi di log a livello 'info' e utilizza un formato personalizzato
 * che include timestamp, livello e messaggio.
 * I messaggi di log vengono scritti sia sulla console che su un file chiamato 'transits.log'.
 */
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message}) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'transits.log' })
    ]
});

export default logger;