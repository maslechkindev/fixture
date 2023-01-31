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
var JobQueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueueService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("../../integrations/knex");
const PgBoss = require("pg-boss");
const config_1 = require("../../../config");
const { HOST, PORT, USER, PASSWORD, DATABASE } = config_1.default.DATABASE;
let JobQueueService = JobQueueService_1 = class JobQueueService {
    constructor(knex) {
        this.knex = knex;
        this.logger = new common_1.Logger(JobQueueService_1.name);
        const bossInstance = new PgBoss({
            database: DATABASE,
            user: USER,
            password: PASSWORD,
            host: HOST,
            port: PORT,
        });
        this.activeWorkers = {};
        this.asleepWorkers = {};
        (async () => {
            const initiatedBoss = await bossInstance.start();
            this.boss = initiatedBoss;
            await Promise.all(Object.entries(this.asleepWorkers).map(([queueName, handler]) => this.activateWorker(queueName, handler)));
            this.boss.on('error', (error) => this.logger.error(error));
        })();
    }
    async activateWorker(queueName, handler) {
        await this.boss.work(queueName, handler);
        this.activeWorkers[queueName] = handler;
        delete this.asleepWorkers[queueName];
        this.logger.log(`activateWorker: added ${queueName}`);
    }
    moveWorketToAsleep(queueName, handler) {
        this.asleepWorkers[queueName] = handler;
    }
    async onModuleDestroy() {
        await this.boss.stop();
    }
    async init(queueName, handler) {
        if (this.boss) {
            if (!this.activeWorkers[queueName]) {
                await this.activateWorker(queueName, handler);
            }
        }
        else {
            if (!this.asleepWorkers[queueName]) {
                this.moveWorketToAsleep(queueName, handler);
            }
        }
    }
    async addToQueue(dateISOString, queueName, pld, uniqueKey) {
        await this.boss.sendAfter(queueName, pld, uniqueKey ? { singletonKey: uniqueKey } : {}, dateISOString);
    }
    async cancelJob(uniqueKey) {
        await this.boss.cancel(uniqueKey);
    }
    async getJob(uniqueKey) {
        return this.boss.getJobById(uniqueKey);
    }
    async getJobsByMetadata(name, state, meta) {
        const where = Object.entries(meta)
            .map(([key, value], index) => {
            let clause = '';
            const castAction = typeof value === 'number' ? '::int' : '';
            if (index)
                clause += 'and ';
            clause += `(data -> 'meta' ->> '${key}')${castAction} = ${value}`;
            return clause;
        })
            .join(' ');
        const jobs = await this.knex
            .withSchema('pgboss')
            .select('*')
            .from('job')
            .whereRaw(where)
            .andWhere({ name, state });
        return jobs;
    }
};
JobQueueService = JobQueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], JobQueueService);
exports.JobQueueService = JobQueueService;
//# sourceMappingURL=job-queue.service.js.map