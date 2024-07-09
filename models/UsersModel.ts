import { DataTypes} from 'sequelize';
import { dbConnector } from '../db/DatabaseConnection';


/**
 * Connessione al database utilizzando Sequelize.
 * 
 */
const sequelize = dbConnector.getInstance();
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: any) => {
  console.error('Unable to connect to the database: ', error);
});


/**
 * Definizione del modello "users" relativo alla tabella del db corrispondente.
 * 
 */
export const UsersModel = sequelize.define('users', {
    badgeId: {
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
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    authLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isSuspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tokens: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
        modelName: 'UsersModel',
        timestamps: false,
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
});