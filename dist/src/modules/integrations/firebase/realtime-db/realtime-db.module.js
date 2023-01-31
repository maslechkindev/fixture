"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeDbModule = void 0;
const common_1 = require("@nestjs/common");
const realtime_db_service_1 = require("./realtime-db.service");
let RealtimeDbModule = class RealtimeDbModule {
};
RealtimeDbModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [realtime_db_service_1.RealtimeDbService],
        providers: [realtime_db_service_1.RealtimeDbService],
        exports: [realtime_db_service_1.RealtimeDbService],
    })
], RealtimeDbModule);
exports.RealtimeDbModule = RealtimeDbModule;
//# sourceMappingURL=realtime-db.module.js.map