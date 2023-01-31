"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplePublicKey = void 0;
const jwksClient = require("jwks-rsa");
const config_1 = require("../../../../../../config");
const { APPLE_BASE_URL, APPLE_JWKS } = config_1.default.SSO.APPLE;
const getApplePublicKey = async (kid) => {
    const client = jwksClient({
        cache: true,
        jwksUri: `${APPLE_BASE_URL}${APPLE_JWKS}`,
    });
    const key = await new Promise((resolve, reject) => {
        client.getSigningKey(kid, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
    return key.getPublicKey();
};
exports.getApplePublicKey = getApplePublicKey;
//# sourceMappingURL=applePublicKey.js.map