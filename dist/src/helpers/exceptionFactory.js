"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionFactory = void 0;
const errors_1 = require("./errors");
const exceptionFactory = (validationErrors) => {
    const errors = validationErrors.flatMap((e) => {
        return e.children && e.children.length > 0 ? e.children : [e];
    });
    const result = errors.reduce((a, e) => {
        const arr = Object.keys(e.constraints).map((c) => {
            if (e.contexts && e.contexts[c]) {
                return { code: e.contexts[c].code, message: e.contexts[c].message };
            }
            else {
                return { code: '', message: e.constraints[c] };
            }
        });
        return a.concat(arr);
    }, []);
    return new errors_1.BadRequestExceptionCustom(result);
};
exports.exceptionFactory = exceptionFactory;
//# sourceMappingURL=exceptionFactory.js.map