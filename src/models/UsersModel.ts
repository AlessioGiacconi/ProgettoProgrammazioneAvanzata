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
 * Definizione del modello "users" relativo alla tabella del database corrispondente.
 * La tabella contiene le informazioni sugli utenti.
 * 
 * @property {number} badge_id - L'ID del badge. È la chiave primaria e viene incrementata automaticamente.
 * @property {string} email - L'email dell'utente.
 * @property {string} passwd - La password dell'utente.
 * @property {string} role - Il ruolo dell'utente (ad esempio, "admin", "user", "passage").
 * @property {boolean} is_suspended - Indica se l'utente è sospeso.
 * @property {number} tokens - Il numero di token dell'utente.
 * @property {number|null} passage_reference - Riferimento al passaggio associato all'utente. È una chiave esterna che fa riferimento alla tabella "passages".
 * @property {number} unauthorized_attempts - Il numero di tentativi non autorizzati dell'utente. Il valore predefinito è 0.
 * @property {Date} created_at - La data di creazione dell'utente. Il valore predefinito è l'ora corrente.
 * @property {Date} updated_at - La data di aggiornamento dell'utente. Il valore predefinito è l'ora corrente.
 */
export const UsersModel = sequelize.define('users', {
    badge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_suspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tokens: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    passage_reference: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'passages',
            key: 'passage_id'
        }
    },
    unauthorized_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
        modelName: 'UsersModel',
        timestamps: true,
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
});