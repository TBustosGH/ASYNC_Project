import sequelize from "../database/server.js";
import { Umzug, SequelizeStorage } from "umzug";

export const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: '../migrations/*.ts'
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations '}),
        context: sequelize.getQueryInterface(),
        logger: console
    });
    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name)
    });
};