"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.points = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const buffer = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../../../../../../assets/point.png'));
exports.points = `<img src="data:image/png;base64,${buffer.toString('base64')}"  style="width: 36px; height: 36px;" />`;
//# sourceMappingURL=points.js.map