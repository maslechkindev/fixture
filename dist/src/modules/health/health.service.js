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
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const systeminformation = require("systeminformation");
const knex_1 = require("../integrations/knex");
let HealthService = class HealthService {
    constructor(knex) {
        this.knex = knex;
    }
    async getHealth() {
        const load = await systeminformation.currentLoad();
        const memory = await systeminformation.mem();
        const heapUsed = process.memoryUsage().heapUsed / 1024 / 1024;
        const { pool } = this.knex.client;
        const { used, free, pendingCreates, pendingAcquires, pendingDestroys, pendingValidations, } = pool;
        const poolData = {
            used,
            free,
            pendingCreates,
            pendingAcquires,
            pendingDestroys,
            pendingValidations,
            numUsed: pool.numUsed(),
            numFree: pool.numFree(),
            numPendingAcquires: pool.numPendingAcquires(),
            numPendingCreates: pool.numPendingCreates(),
        };
        const healthData = {
            cpu: load,
            memory,
            heapUsed,
            pool: poolData,
        };
        return healthData;
    }
    async clean() {
        const idleQueries = await this.knex
            .raw(`SELECT * 
            FROM pg_stat_activity 
            WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' and backend_xid is not null
            ORDER BY query_start desc;`);
        await Promise.all(idleQueries.rows.map(async ({ pid }) => {
            await this.knex.raw(`SELECT pg_cancel_backend(?)`, [pid]);
            await this.knex.raw(`SELECT pg_terminate_backend(?)`, [pid]);
        }));
        return { success: true };
    }
};
HealthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], HealthService);
exports.HealthService = HealthService;
//# sourceMappingURL=health.service.js.map