"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bronzeMedal = exports.silverMedal = exports.goldMedal = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const goldMedalBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../../../../../../assets/gold.png'));
const silverMedalBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../../../../../../assets/silver.png'));
const bronzeMedalBuffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../../../../../../assets/bronze.svg'));
exports.goldMedal = `<img src="data:image/png;base64,${goldMedalBuffer.toString('base64')}"  style="width: 32px; height: 32px;" />`;
exports.silverMedal = `<img src="data:image/png;base64,${silverMedalBuffer.toString('base64')}"  style="width: 32px; height: 32px;" />`;
exports.bronzeMedal = `<img src="data:image/svg+xml;base64,${bronzeMedalBuffer.toString('base64')}"  style="width: 32px; height: 32px;" />`;
//# sourceMappingURL=medals.js.map