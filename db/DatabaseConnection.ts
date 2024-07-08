import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const pgdbUser = process.env.PGDB_USER || 'postgres';
const pgdbPassword = process.env.PGDB_PASSWD;
const pgdbName = process.env.PGDB_NAME || 'dbpa';
const pgdbHost = process.env.PGDB_HOST || 'db';
const pgdbPort = process.env.PGDB_PORT || 5432;


export class dbConnector {
    private static instance: dbConnector;
    private connection: Sequelize;

    private constructor() {

        this.connection = new Sequelize(pgdbName, pgdbUser, pgdbPassword, {
            host: pgdbHost,
            port: Number(pgdbPort),
            dialect: 'postgres',
        });
    }

    public static getInstance(): Sequelize {
        if(!dbConnector.instance){
            this.instance = new dbConnector();
        }
        return dbConnector.instance.connection;
    }

}