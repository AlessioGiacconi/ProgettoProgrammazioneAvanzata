/**
 * @file PassagesModel.ts
 * @description Questo file definisce il modello "passages" utilizzando Sequelize 
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
 * Definizione del modello "passages" relativo alla tabella del database corrispondente.
 * La tabella contiene le informazioni sui passaggi.
 * 
 * @property {number} passage_id - L'ID del passaggio. È la chiave primaria e viene incrementata automaticamente.
 * @property {number} level - Il livello del passaggio.
 * @property {boolean} needs_dpi - Indica se il passaggio richiede DPI (Dispositivi di Protezione Individuale).
 */
export const PassagesModel = sequelize.define('passages', {
    passage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    needs_dpi: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
        modelName: 'PassagesModel',
        timestamps: false,
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
});