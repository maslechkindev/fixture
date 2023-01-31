"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.default = () => crypto.randomBytes(64).toString('hex');
//# sourceMappingURL=generateRandomBytes.js.map