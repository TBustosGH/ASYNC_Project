import sequelize from "../database/server.js";
import models from "../database/models/index.js";
//import { runMigrations } from "../database/migrator.js";
import { DB_NAME } from "./config.js";

const syncModels = async () => {
    await models.User.sync();
    await models.Post.sync();
    await models.Comment.sync();
};

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        await syncModels();
        // await runMigrations();
        console.log('connected to the database');
    } catch (error) {
        console.log('failed to connect to the database');
        console.log(error);
        return process.exit(1);
    }
};

export const testDbConnection = async () => {
    await sequelize.authenticate();
    console.log(`Connection with ${DB_NAME} successfully established.`);
    await sequelize.close();
    console.log('Connection closed.');
};