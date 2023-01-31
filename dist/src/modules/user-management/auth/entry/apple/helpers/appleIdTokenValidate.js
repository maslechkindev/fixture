"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const applePublicKey_1 = require("./applePublicKey");
const config_1 = require("../../../../../../config");
const jwt = require("jsonwebtoken");
const errors_1 = require("../../../../../../helpers/errors");
const { CLIENT_IDS, APPLE_BASE_URL } = config_1.default.SSO.APPLE;
async function default_1(token) {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header) {
        throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.APPLE_SPECIFIC.TOKEN_VALIDATION_INVALID);
    }
    const { kid, alg } = decoded.header;
    const public_key = await (0, applePublicKey_1.getApplePublicKey)(kid);
    const jwtClaims = jwt.verify(token, public_key, {
        algorithms: [alg],
    });
    if (typeof jwtClaims !== 'string') {
        if (!jwtClaims.iss || jwtClaims.iss !== APPLE_BASE_URL) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.APPLE_SPECIFIC.TOKEN_VALIDATION_ISS);
        }
        if (Array.isArray(CLIENT_IDS) &&
            ((Array.isArray(jwtClaims.aud) === true &&
                jwtClaims.aud.find((e) => CLIENT_IDS.includes(e))) ||
                (typeof jwtClaims.aud === 'string' &&
                    CLIENT_IDS.includes(jwtClaims.aud))) &&
            jwtClaims.exp >= Math.trunc(Date.now() / 1000)) {
            return jwtClaims;
        }
        throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.APPLE_SPECIFIC.TOKEN_VALIDATION_AUD);
    }
    throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.APPLE_SPECIFIC.TOKEN_VALIDATION_CLAIMS_TYPE);
}
exports.default = default_1;
//# sourceMappingURL=appleIdTokenValidate.js.map