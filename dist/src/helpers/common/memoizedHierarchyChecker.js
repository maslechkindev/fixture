"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoizedHierarchyChecker = void 0;
const memoizedHierarchyChecker = () => {
    const cache = {};
    return (main, secondary, periods) => {
        if (`${secondary}-${main}` in cache) {
            return cache[`${secondary}-${main}`];
        }
        if (!main || !secondary) {
            return false;
        }
        if (main === secondary) {
            cache[`${secondary}-${main}`] = true;
            return true;
        }
        let periodId = secondary;
        while (periodId) {
            const period = periods.find((p) => p.periodId === periodId);
            if (!period) {
                cache[`${secondary}-${main}`] = false;
                return false;
            }
            const parentPeriod = periods.find((p) => p.periodId === period.parentId);
            if (!parentPeriod) {
                cache[`${secondary}-${main}`] = false;
                return false;
            }
            if (parentPeriod.periodId === main) {
                cache[`${secondary}-${main}`] = true;
                return true;
            }
            periodId = parentPeriod.periodId;
        }
        cache[`${secondary}-${main}`] = false;
        return false;
    };
};
exports.memoizedHierarchyChecker = memoizedHierarchyChecker;
//# sourceMappingURL=memoizedHierarchyChecker.js.map