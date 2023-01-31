"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const timers = {};
const debounce = (func, key, timeout) => {
    const timer = timers[key];
    return (...args) => {
        clearTimeout(timer);
        timers[key] = setTimeout(() => {
            delete timers[key];
            return func.apply(this, args);
        }, timeout);
    };
};
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map