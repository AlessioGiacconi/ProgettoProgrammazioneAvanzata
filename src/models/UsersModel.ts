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
 * Definizione del modello "users" relativo alla tabella del db corrispondente.
 * 
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