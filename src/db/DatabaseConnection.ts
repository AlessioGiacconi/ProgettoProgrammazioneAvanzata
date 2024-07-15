/**
 * @file DatabaseConnection.ts
 * @description Questo file contiene la classe per gestire la connessione al database utilizzando Sequelize.
 */

import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const pgdbUser = process.env.PGDB_USER || 'postgres';
const pgdbPassword = process.env.PGDB_PASSWD;
const pgdbName = process.env.PGDB_NAME || 'dbpa';
const pgdbHost = process.env.PGDB_HOST || 'dbpostgres';
const pgdbPort = process.env.PGDB_PORT || 5432;

/**
 * @class DatabaseConnection
 * @description Classe singleton per gestire la connessione al database PostgreSQL utilizzando Sequelize.
 */
export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connection: Sequelize;

    /**
     * @constructor
     * @description Crea una nuova connessione al database utilizzando i parametri di configurazione.
     */
    private constructor() {

        this.connection = new Sequelize(pgdbName, pgdbUser, pgdbPassword, {
            host: pgdbHost,
            port: Number(pgdbPort),
            dialect: 'postgres',
        });
    }

    /**
     * @function getInstance
     * @description Ritorna l'istanza singleton della connessione al database.
     * @returns {Sequelize} L'istanza Sequelize della connessione al database.
     */
    public static getInstance(): Sequelize {
        if(!DatabaseConnection.instance){
            this.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance.connection;
    }

}