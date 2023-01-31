"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.realMoney = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const realMoneyBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../../../../../../assets/real_money.svg'));
const tokensBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../../../../../../assets/coins.svg'));
exports.realMoney = `<img src="data:image/svg+xml;base64,${realMoneyBuffer.toString('base64')}"  style="width: 32px; height: 32px;" />`;
exports.tokens = `<img src="data:image/svg+xml;base64,${tokensBuffer.toString('base64')}"  style="width: 32px; height: 32px;" />`;
//# sourceMappingURL=prizeIcons.js.map