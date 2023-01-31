"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectConnection = exports.InjectKnex = void 0;
const common_1 = require("@nestjs/common");
const knex_utils_1 = require("./knex.utils");
const InjectKnex = (connection) => {
    return (0, common_1.Inject)((0, knex_utils_1.getKnexConnectionToken)(connection));
};
exports.InjectKnex = InjectKnex;
exports.InjectConnection = exports.InjectKnex;
//# sourceMappingURL=knex.decorators.js.map