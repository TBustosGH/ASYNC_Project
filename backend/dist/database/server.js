import { Sequelize } from "sequelize";
import { MAIN_DB_URI } from "../utils/config.js";
const testDbConnection = async () => {
    if (!MAIN_DB_URI) {
        throw new Error('No DB uri found!');
    }
    const sequelize = new Sequelize(MAIN_DB_URI);
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.close();
    console.log('Connection closed.');
};
export default testDbConnection;
//# sourceMappingURL=server.js.map