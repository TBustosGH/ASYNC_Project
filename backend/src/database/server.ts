import { Sequelize } from "sequelize";
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "../utils/config.js";

if (!(DB_NAME && DB_USERNAME && DB_PASSWORD && DB_HOST && DB_PORT)) {
    throw new Error('Insuficient or invalid database connection informarion!');
}

import fs from "fs";
import path from "path";

const currentDir = import.meta.dirname; // Get the actual dirname
const dbCaPemDir = "../../ca.pem";  // Dir of the CA Certificate of the data base

// Initialize a sequelize instance
const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            ca: fs.readFileSync(path.join(currentDir, dbCaPemDir), "utf-8")
        }
    }
});


export default sequelize;