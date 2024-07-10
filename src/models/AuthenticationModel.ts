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
 * Definizione del modello "authentication" relativo alla tabella del db corrispondente.
 * 
 */
export const AuthenticationModel = sequelize.define('authentications', {
    badge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'badge_id',
        }
    },
    passage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'passages',
            key: 'passage_id',
        }
    }
}, {
    modelName: 'AuthenticationModel',
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});