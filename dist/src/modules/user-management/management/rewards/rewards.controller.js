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
exports.RewardsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../helpers/swagger/decorators");
const rewards_service_1 = require("./rewards.service");
const rewards_dto_1 = require("./dto/rewards.dto");
const registrationRewardsUpdate_dto_1 = require("./dto/registrationRewardsUpdate.dto");
const errors_1 = require("../../../../helpers/errors");
let RewardsController = class RewardsController {
    constructor(rewardsService) {
        this.rewardsService = rewardsService;
    }
    async getRewards() {
        return await this.rewardsService.getRewards();
    }
    async updateRewards(body) {
        try {
            return await this.rewardsService.updateRewards(body.rewards);
        }
        catch (err) {
            throw new common_1.BadRequestException(typeof err === 'string'
                ? err
                : err.toString
                    ? err.toString()
                    : JSON.stringify(err));
        }
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: rewards_dto_1.WrappedRewards,
        description: 'Retrieved latest rewards entry',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "getRewards", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: rewards_dto_1.WrappedRewards,
        description: 'Updated rewards entry',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.ENTRY_NOT_UPDATED).getResponse(),
                },
                {
                    description: 'Db errors',
                    example: {
                        message: 'Error: Empty .update() call detected! Update data does not contain any values to update. This will result in a faulty query. Table: registration_rewards. Columns: .',
                    },
                },
            ],
            description: 'Update errors',
        },
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registrationRewardsUpdate_dto_1.RegistrationRewardsUpdateDto]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "updateRewards", null);
RewardsController = __decorate([
    (0, decorators_1.ApiTags)('Rewards management'),
    (0, common_1.Controller)('management/rewards'),
    __metadata("design:paramtypes", [rewards_service_1.RewardsService])
], RewardsController);
exports.RewardsController = RewardsController;
//# sourceMappingURL=rewards.controller.js.map