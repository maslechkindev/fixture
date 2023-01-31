"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function default_1(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(derivedKey.toString('hex'));
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=getPasswordHash.js.map