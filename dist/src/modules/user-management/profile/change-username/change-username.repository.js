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
exports.ChangeUsernameRepository = void 0;
const knex_1 = require("../../../integrations/knex");
const config_1 = require("../../../../config");
const balance_service_1 = require("../../../balance/balance.service");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const types_1 = require("../../../integrations/firebase/messages/notifications/types");
const { USERNAME_EDITABLE_MINUTES } = config_1.default.EXPIRATIONS.PERSONAL_DETAILS;
const { VALIDATION_PERIODS } = config_1.default.NOTIFICATIONS.PERSONAL_DETAILS.USERNAME_CHANGE;
let ChangeUsernameRepository = class ChangeUsernameRepository {
    constructor(knex, balanceService) {
        this.knex = knex;
        this.balanceService = balanceService;
    }
    async isEditableByConfirmationTime(confirmedAt) {
        const [{ isEditable }] = await this.knex.select(this.knex.raw('((?::timestamp + ?::interval) > now()) as "isEditable"', [
            confirmedAt,
            `${USERNAME_EDITABLE_MINUTES} minutes`,
        ]));
        return isEditable;
    }
    async change(txManager, id, username) {
        const conn = txManager.transaction || this.knex;
        await conn('users')
            .update({
            username,
            isUsernameChanged: true,
        })
            .where({ id });
        await this.balanceService.changeUsernameReward(txManager, id);
        await this.balanceService.syncFirestoreUsersBalances(txManager, [id]);
    }
    async isUsedByOtherUser(id, username) {
        const data = await this.knex('users')
            .where({ username })
            .andWhereNot({ id });
        return Boolean(data.length);
    }
    async getUsernameChangeReward() {
        const { username } = await this.knex('registration_rewards')
            .first()
            .select('username');
        return username;
    }
    async getUsersToNotifyAboutChangeUsername() {
        const conn = this.knex;
        const query = conn
            .select([
            'u.id as userId',
            'u.notificationsEnabled',
            conn.raw(`coalesce((array_agg(ni.token) filter (where ni.token is not null)), '{}') as tokens`),
            conn.raw(`json_build_object(
            'reward', (??),
            'beforeDate', (??)
          ) as data`, [
                conn('registration_rewards')
                    .first()
                    .select(conn.raw('username::varchar(255)')),
                conn.raw(`to_char("confirmedAt"::timestamp + ?::interval, 'Mon DD,YYYY')`, [`${USERNAME_EDITABLE_MINUTES} minutes`]),
            ]),
        ])
            .from({ u: 'users' })
            .leftJoin({ ni: 'notification_identifiers' }, 'ni.userId', '=', 'u.id')
            .groupBy('u.id');
        query.where({ isUsernameChanged: false }).andWhere(function () {
            VALIDATION_PERIODS.map(([from, to]) => {
                this.orWhere(function () {
                    this.where(conn.raw('now()'), '>=', conn.raw(`"confirmedAt" + ?::interval`, [`${from} minutes`])).where(conn.raw('now()'), '<', conn.raw(`"confirmedAt" + ?::interval`, [`${to} minutes`]));
                });
            });
        });
        const data = await query;
        return data;
    }
};
ChangeUsernameRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function, balance_service_1.BalanceService])
], ChangeUsernameRepository);
exports.ChangeUsernameRepository = ChangeUsernameRepository;
//# sourceMappingURL=change-username.repository.js.map