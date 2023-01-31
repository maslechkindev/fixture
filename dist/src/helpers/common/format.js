"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOrdinals = void 0;
const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th'],
]);
const formatOrdinals = (n) => {
    const rule = pr.select(Number(n));
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};
exports.formatOrdinals = formatOrdinals;
//# sourceMappingURL=format.js.map