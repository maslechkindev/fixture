"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKnexConnection = exports.getKnexConnectionToken = exports.getKnexOptionsToken = void 0;
const knex_1 = require("knex");
const knex_constants_1 = require("./knex.constants");
function getKnexOptionsToken(connection) {
    return `${connection || knex_constants_1.KNEX_MODULE_CONNECTION}_${knex_constants_1.KNEX_MODULE_OPTIONS_TOKEN}`;
}
exports.getKnexOptionsToken = getKnexOptionsToken;
function getKnexConnectionToken(connection) {
    return `${connection || knex_constants_1.KNEX_MODULE_CONNECTION}_${knex_constants_1.KNEX_MODULE_CONNECTION_TOKEN}`;
}
exports.getKnexConnectionToken = getKnexConnectionToken;
function createKnexConnection(options) {
    const { config } = options;
    return (0, knex_1.knex)(config);
}
exports.createKnexConnection = createKnexConnection;
//# sourceMappingURL=knex.utils.js.map