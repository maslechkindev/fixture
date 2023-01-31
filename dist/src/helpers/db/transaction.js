"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../../modules/integrations/knex");
const knexTransaction_interface_1 = require("../../interfaces/db/knexTransaction.interface");
const promisify_1 = require("../common/promisify");
exports.default = (knex) => (0, promisify_1.default)(knex.transaction.bind(knex));
//# sourceMappingURL=transaction.js.map