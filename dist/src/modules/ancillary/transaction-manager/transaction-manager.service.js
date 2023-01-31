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
exports.TransactionManager = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("../../integrations/knex");
let TransactionManager = class TransactionManager {
    constructor(knex) {
        this.knex = knex;
    }
    async begin() {
        const transaction = await this.knex.transaction();
        return {
            knex: this.knex,
            transaction,
            commit: transaction.commit,
            rollback: transaction.rollback,
        };
    }
};
TransactionManager = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], TransactionManager);
exports.TransactionManager = TransactionManager;
//# sourceMappingURL=transaction-manager.service.js.map