/**
 * @file AuthorizationModel.ts
 * @description Questo file definisce il modello "authorizations" utilizzando Sequelize 
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
 * Definizione del modello "authorizations" relativo alla tabella del database corrispondente.
 * La tabella contiene le informazioni sulle autorizzazioni degli utenti per specifici passaggi.
 * 
 * @property {number} badge - L'ID del badge dell'utente. Fa riferimento alla colonna 'badge_id' nella tabella 'users'.
 * @property {number} passage - L'ID del passaggio. Fa riferimento alla colonna 'passage_id' nella tabella 'passages'.
 */
export const AuthorizationModel = sequelize.define('authorizations', {
    badge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'badge_id',
        },
        primaryKey: true
    },
    passage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'passages',
            key: 'passage_id',
        },
        primaryKey: true
    }
}, {
    modelName: 'AuthenticationModel',
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});