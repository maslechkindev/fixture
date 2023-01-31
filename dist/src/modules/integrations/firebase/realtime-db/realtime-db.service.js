"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeDbService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_service_1 = require("../admin/firebase-admin.service");
let RealtimeDbService = class RealtimeDbService {
    constructor(firebaseAdminService) {
        this.firebaseAdminService = firebaseAdminService;
    }
    get realtimeDb() {
        return this.firebaseAdminService.firebase.database();
    }
    async get(path) {
        const snapshot = await this.realtimeDb.ref(path).once('value');
        return snapshot.val();
    }
    async set(path, value) {
        return this.realtimeDb.ref(path).set(value);
    }
    async push(path, value) {
        return this.realtimeDb.ref(path).push(value);
    }
};
RealtimeDbService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_admin_service_1.FirebaseAdminService])
], RealtimeDbService);
exports.RealtimeDbService = RealtimeDbService;
//# sourceMappingURL=realtime-db.service.js.map