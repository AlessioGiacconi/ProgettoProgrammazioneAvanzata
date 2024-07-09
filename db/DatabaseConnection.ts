import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const pgdbUser = process.env.PGDB_USER || 'postgres';
const pgdbPassword = process.env.PGDB_PASSWD;
const pgdbName = process.env.PGDB_NAME || 'dbpa';
const pgdbHost = process.env.PGDB_HOST || 'dbpostgres';
const pgdbPort = process.env.PGDB_PORT || 5432;


export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connection: Sequelize;

    private constructor() {

        this.connection = new Sequelize(pgdbName, pgdbUser, pgdbPassword, {
            host: pgdbHost,
            port: Number(pgdbPort),
            dialect: 'postgres',
        });
    }

    public static getInstance(): Sequelize {
        if(!DatabaseConnection.instance){
            this.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance.connection;
    }

}