import { Umzug, SequelizeStorage } from "umzug";
import path from "path";
import sequelize from "./server.js";
// Define a migrator instance to run migrations later
export const migrator = new Umzug({
    migrations: {
        glob: path.join(__dirname, 'migrations/*.ts')
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console
});
if (require.main === module) {
    migrator.runAsCLI(); // This will allow migrations to be run from CLI
}
//# sourceMappingURL=migrator.js.map