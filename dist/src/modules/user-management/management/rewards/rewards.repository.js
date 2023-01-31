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
exports.RewardsRepository = void 0;
const knex_1 = require("../../../integrations/knex");
const R = require("ramda");
const errors_1 = require("../../../../helpers/errors");
let RewardsRepository = class RewardsRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async getRewards() {
        const fields = [
            'rewardsId',
            'registrationNotReferred',
            'registrationReferred',
            'registrationReferredHolder',
            'personalDetails',
            'username',
            'updatedAt',
            'updatedBy',
        ];
        const [rewards] = await this.knex('registration_rewards')
            .select(fields)
            .limit(1);
        if (!rewards) {
            throw new Error('Could not retrieve rewards entry');
        }
        return R.pick(fields, rewards);
    }
    async updateRewards(rewards) {
        const fields = [
            'rewardsId',
            'registrationNotReferred',
            'registrationReferred',
            'registrationReferredHolder',
            'personalDetails',
            'username',
            'updatedAt',
            'updatedBy',
        ];
        const [updatedRewards] = await this.knex('registration_rewards')
            .update(Object.assign(Object.assign({}, R.omit(['rewardsId'], rewards)), { updatedAt: this.knex.raw('NOW()') }))
            .where({ rewardsId: rewards.rewardsId })
            .returning(fields);
        if (!updatedRewards) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.ENTRY_NOT_UPDATED);
        }
        return R.pick(fields, updatedRewards);
    }
};
RewardsRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], RewardsRepository);
exports.RewardsRepository = RewardsRepository;
//# sourceMappingURL=rewards.repository.js.map