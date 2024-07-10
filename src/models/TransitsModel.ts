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
 * Definizione del modello "transits" relativo alla tabella del db corrispondente.
 * 
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