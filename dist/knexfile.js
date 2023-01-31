"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./src/config");
const connection = {
    host: config_1.default.DATABASE.HOST,
    port: config_1.default.DATABASE.PORT,
    user: config_1.default.DATABASE.USER,
    password: config_1.default.DATABASE.PASSWORD,
    database: config_1.default.DATABASE.DATABASE,
};
module.exports = {
    client: 'pg',
    connection: connection,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
};
//# sourceMappingURL=knexfile.js.map