"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({
    path: (0, path_1.resolve)(process.cwd(), '.env'),
});
const getEnvVar = (varName, defaultValue) => process.env[varName] || defaultValue;
exports.getEnvVar = getEnvVar;
//# sourceMappingURL=helpers.js.map