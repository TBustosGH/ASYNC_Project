import { Sequelize } from "sequelize";
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "../utils/config.js";
if (!(DB_NAME && DB_USERNAME && DB_PASSWORD && DB_HOST && DB_PORT)) {
    throw new Error('Insuficient or invalid database connection informarion!');
}
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
            rejectUnauthorized: false
        }
    }
});
export const testDbConnection = async () => {
    await sequelize.authenticate();
    console.log(`Connection with ${DB_NAME} successfully established.`);
    await sequelize.close();
    console.log('Connection closed.');
};
export default sequelize;
//# sourceMappingURL=server.js.map