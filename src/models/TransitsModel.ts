/**
 * @file TransitsModel.ts
 * @description Questo file definisce il modello "transits" utilizzando Sequelize 
 *              per interagire con la tabella corrispondente nel database.
 */

import { DataTypes} from 'sequelize';
import { DatabaseConnection } from '../db/DatabaseConnection';


/**
 * Connessione al database utilizzando Sequelize.
 * 
 */
const sequelize = DatabaseConnection.getInstance();
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: any) => {
  console.error('Unable to connect to the database: ', error);
});


/**
 * Definizione del modello "transits" relativo alla tabella del database corrispondente.
 * La tabella contiene le informazioni sui transiti.
 * 
 * @property {number} transit_id - L'ID del transito. È la chiave primaria e viene incrementata automaticamente.
 * @property {number} passage - L'ID del passaggio associato al transito. È una chiave esterna che fa riferimento alla tabella "passages".
 * @property {number} badge - L'ID del badge associato al transito. È una chiave esterna che fa riferimento alla tabella "users".
 * @property {Date} transit_date - La data del transito. Il valore predefinito è l'ora corrente.
 * @property {boolean} is_authorized - Indica se il transito è autorizzato.
 * @property {boolean} violation_dpi - Indica se vi è una violazione dei DPI (Dispositivi di Protezione Individuale).
 */
export const TransitsModel = sequelize.define('transits', {
    transit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    passage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'passages',
            key: 'passage_id',
        }
    },
    badge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'badge_id',
        }
    },
    transit_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
    },
    is_authorized: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    violation_dpi: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
        modelName: 'TransitsModel',
        timestamps: false,
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
});