"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return '';
    }
    const [prefix, token] = authorization.split(' ');
    if (!prefix || !token || prefix !== 'Bearer') {
        return '';
    }
    return token;
};
//# sourceMappingURL=extractToken.js.map