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
export const TransitsModel = sequelize.define('transits', {
    transitId: {
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
            key: 'passageId',
        }
    },
    badge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'badgeId',
        }
    },
    transitDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
    },
    isAuthorized: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    violationDPI: {
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