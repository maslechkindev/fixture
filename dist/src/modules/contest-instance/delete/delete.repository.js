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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContestInstanceRepository = void 0;
const knex_1 = require("../../integrations/knex");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
let DeleteContestInstanceRepository = class DeleteContestInstanceRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async updateEndTime(contestInstanceId, endTime, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const query = conn('contest_instances')
            .where({ id: contestInstanceId })
            .update({ endTime })
            .toString();
        await conn.raw(`/*${query}*/${query}`);
    }
};
DeleteContestInstanceRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], DeleteContestInstanceRepository);
exports.DeleteContestInstanceRepository = DeleteContestInstanceRepository;
//# sourceMappingURL=delete.repository.js.map