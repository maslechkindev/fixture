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
var FixturesCmsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixturesCmsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../helpers/swagger/decorators");
const R = require("ramda");
const fixture_service_1 = require("./fixture.service");
const getfixtures_dto_1 = require("./dto/getfixtures.dto");
const errors_1 = require("../../helpers/errors");
const getFixture_dto_1 = require("./dto/getFixture.dto");
const updateFixture_dto_1 = require("./dto/updateFixture.dto");
const getFixtureContests_dto_1 = require("./dto/getFixtureContests.dto");
const getFixtureCustomContestIds_dto_1 = require("./dto/getFixtureCustomContestIds.dto");
const postFixtureCreateContestsBulk_dto_1 = require("./dto/postFixtureCreateContestsBulk.dto");
const date_fns_1 = require("date-fns");
const cms_service_1 = require("../integrations/cms/cms.service");
const contest_service_1 = require("../contest/contest.service");
const cancel_service_1 = require("../contest-instance/cancel/cancel.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const contest_instance_participants_service_1 = require("../contest-instance/contest-instance-participants/contest-instance-participants.service");
const getFixtureContest_1 = require("./dto/getFixtureContest");
const getFixtureMarkets_dto_1 = require("./dto/getFixtureMarkets.dto");
const fixture_status_id_enum_1 = require("./enums/fixture-status-id.enum");
const postFixtureStatFreeBets_dto_1 = require("./dto/postFixtureStatFreeBets.dto");
const postLockOddsChange_dto_1 = require("./dto/postLockOddsChange.dto");
const updateFixtureContest_dto_1 = require("./dto/updateFixtureContest.dto");
let FixturesCmsController = FixturesCmsController_1 = class FixturesCmsController {
    constructor(fixtureService, cmsService, contestService, contestInstanceService, contestInstanceParticipantService, cancelContestInstanceService) {
        this.fixtureService = fixtureService;
        this.cmsService = cmsService;
        this.contestService = contestService;
        this.contestInstanceService = contestInstanceService;
        this.contestInstanceParticipantService = contestInstanceParticipantService;
        this.cancelContestInstanceService = cancelContestInstanceService;
        this.logger = new common_1.Logger(FixturesCmsController_1.name);
    }
    async getFixtures(params) {
        const { statuses, page, size, direction, orderBy, search } = params;
        const { fixtures, count } = await this.fixtureService.getAll({
            statuses,
            page,
            size,
            direction,
            orderBy,
            search,
        });
        return { fixtures, count };
    }
    async getParticicpantsInfo(params) {
        const { instanceId, page, size, search } = params;
        const response = await this.contestInstanceService.getParticipantsInfoByInstanceId(instanceId, page, size, search);
        return response;
    }
    async getContestInstancesByContestId(contestId, params) {
        const { page, size } = params;
        const response = await this.contestService.getContestInstancesByContestId(contestId, { page, size });
        return response;
    }
    async getFixture(fixtureId) {
        const fixture = await this.fixtureService.getFixtureById(fixtureId);
        return { fixture };
    }
    async updateFixture(fixtureId, body) {
        const { fixture: fixtureFromBody, markets, contests, marketLines } = body;
        const fixture = await this.fixtureService.getFixtureById(fixtureId);
        if (!fixture) {
            throw new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND);
        }
        await this.fixtureService.updateFixture(fixtureFromBody, fixture);
        if (Array.isArray(markets) && markets.length > 0) {
            await this.fixtureService.updateFixtureMarkets(fixture, markets);
        }
        if (Array.isArray(contests) && contests.length > 0) {
            await this.fixtureService.updateContests(contests);
        }
        if (Array.isArray(marketLines) && marketLines.length > 0) {
            await this.fixtureService.updateMarketLines(marketLines);
        }
        return { success: true };
    }
    async getFixtureContests(fixtureId, params) {
        const { page, size, direction, orderBy, search } = params;
        const { contests, count } = await this.fixtureService.getFixtureContestsByFixtureId(fixtureId, {
            page,
            size,
            direction,
            orderBy,
            search,
        });
        return { contests, count };
    }
    async countFixtureContests(fixtureId) {
        const counter = await this.fixtureService.countFixtureContests(fixtureId);
        return counter;
    }
    async getActiveFixtureMarkets(fixtureId, params) {
        const { page, size, direction, orderBy, marketLines: marketId } = params;
        let marketLines = null;
        const { markets, count, cmsInfo } = await this.fixtureService.getActiveFixtureMarketsByFixtureId(fixtureId, {
            page,
            size,
            direction,
            orderBy,
        });
        if (typeof marketId !== 'undefined' && marketId !== null) {
            marketLines = await this.fixtureService.getMarketLinesForMarket(marketId, fixtureId);
        }
        return { markets, count, cmsInfo, marketLines };
    }
    async getFixtureContest(fixtureId, contestId) {
        const contest = await this.fixtureService.getFixtureContestById(fixtureId, contestId);
        return { contest };
    }
    async updateFixtureContest(body) {
        const updateData = R.pick([
            'contestOwnerResourceLink',
            'contestOwnerLabelName',
            'contestName',
            'streamLive',
        ], body);
        await this.fixtureService.updateFixtureContestById(body.id, updateData);
        return { success: true };
    }
    async getFixtureCustomContestIds(fixtureId) {
        const customContestIds = await this.fixtureService.getFixtureCustomContestIds(fixtureId);
        return customContestIds;
    }
    async excludeParticipant(body, contestId) {
        const { instanceId, participantId, reasonOfExclude } = body;
        const result = await this.contestInstanceParticipantService.excludeParticipant(instanceId, participantId, reasonOfExclude, contestId);
        return result;
    }
    async finishInstance(contestId, body) {
        const { contestInstanceId, contestName } = body;
        await this.contestInstanceService.finishContestInstance(contestInstanceId, contestId, contestName);
        return { success: true };
    }
    async cancelInstance(contestId, body) {
        const { contestInstanceId, forcedCancel, contestName } = body;
        try {
            const { fixtureName } = await this.contestInstanceService.getFixtureNameByContestId(contestId);
            const isSuccess = await this.cancelContestInstanceService.cancelContest({
                contestId,
                instanceId: contestInstanceId,
            }, forcedCancel, fixtureName);
            if (!isSuccess) {
                return { success: false };
            }
            await this.contestInstanceParticipantService.notifyUsersContestWasCanceledByAdmin(contestInstanceId, contestName, contestId);
        }
        catch (err) {
            this.logger.error(`${err.message}`, err.stack);
            throw err;
        }
        return { success: true };
    }
    async postFixtureCreateContestsBulk(fixtureId, body) {
        const { cmsContestTemplateIds } = body;
        const parsedContestTemplateIds = this.fixtureService.parseContestTemplateIds(cmsContestTemplateIds);
        const fixture = await this.fixtureService.getFixtureDetailsById(fixtureId);
        if (!fixture) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND);
        }
        if (!fixture.isComplete) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE);
        }
        const notCreatedContests = [];
        await Promise.all(parsedContestTemplateIds.map(async (cmsContestTemplateId) => {
            const { contestTemplate, originalData } = await this.cmsService.getContestTemplateByCmsId(Number(cmsContestTemplateId));
            const { registrationStartTime, registrationStartPeriod } = contestTemplate.registrationTime;
            if (registrationStartTime) {
                const fixtureStartTime = fixture.startTime;
                const contestCreationTime = (0, date_fns_1.subMinutes)(fixtureStartTime, registrationStartTime);
                const currentTime = Date.now();
                const isBeforeFixtureStart = (0, date_fns_1.isBefore)(currentTime, fixtureStartTime) &&
                    fixture.fixtureStatusId === fixture_status_id_enum_1.FixtureStatusId.PENDING;
                if (isBeforeFixtureStart) {
                    const isBeforeContestCreation = (0, date_fns_1.isBefore)(currentTime, contestCreationTime);
                    if (isBeforeContestCreation) {
                        await this.contestService.createContestWithStartTime(contestTemplate, originalData, fixture);
                    }
                    else {
                        await this.contestService.createContestWithInstance(contestTemplate, originalData, fixture);
                    }
                }
                else {
                    notCreatedContests.push(cmsContestTemplateId);
                }
            }
            else if (registrationStartPeriod) {
                if (registrationStartPeriod.periodId === fixture.currentPeriodId) {
                    await this.contestService.createContestWithInstance(contestTemplate, originalData, fixture);
                }
                else {
                    notCreatedContests.push(cmsContestTemplateId);
                }
            }
            else {
                notCreatedContests.push(cmsContestTemplateId);
            }
        }));
        return { success: true, notCreatedContests };
    }
    async performAction(operationType, fixtureId) {
        try {
            await this.fixtureService.performAction(operationType, fixtureId);
            return { success: true };
        }
        catch (err) {
            throw err;
        }
    }
    async fixtureStartFreeBet(fixtureId, body) {
        const fixture = await this.fixtureService.getFixtureDetailsById(fixtureId);
        if (!fixture) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND);
        }
        if (!fixture.isComplete) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE);
        }
        await this.contestService.runCustomFreeBet(fixture.fixtureId, body);
        return { success: true };
    }
    async lockOddsChange(body) {
        await this.contestService.disableLockOddsForForceBets(body);
        return { success: true };
    }
    async getDynamicLink(contestId) {
        try {
            const result = await this.contestService.getDynamicLink(contestId);
            return result;
        }
        catch (err) {
            this.logger.error(`error during creating some link: ${err.message}`, err.stack);
            throw err;
        }
    }
    async viewBets(queryParams, params) {
        const { page, size, orderBy, direction } = queryParams;
        const { instanceId, participantId } = params;
        const result = await this.contestInstanceParticipantService.viewParticipantBets(instanceId, participantId, page, size, orderBy, direction);
        return result;
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getfixtures_dto_1.WrappedGetFixturesResponse,
        description: 'Success',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE).getResponse(),
                },
            ],
        },
        description: 'Success',
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getfixtures_dto_1.GetFixturesRequestDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getFixtures", null);
__decorate([
    (0, common_1.Get)('/participantsInfo'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getParticicpantsInfo", null);
__decorate([
    (0, common_1.Get)('/:contestId/instances'),
    __param(0, (0, common_1.Param)('contestId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getContestInstancesByContestId", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getFixture_dto_1.WrappedGetFixtureResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/:fixtureId'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getFixture", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: updateFixture_dto_1.WrappedUpdateFixtureResponseDto,
        description: 'Successfully updated fixture',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND).getResponse(),
                },
            ],
        },
        description: 'Success',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/:fixtureId'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateFixture_dto_1.UpdateFixtureDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "updateFixture", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getFixtureContests_dto_1.WrappedGetFixtureContestsResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/:fixtureId/contests'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getFixtureContests_dto_1.GetFixtureContestsRequestDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getFixtureContests", null);
__decorate([
    (0, common_1.Get)('/:fixtureId/contests/count'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "countFixtureContests", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getFixtureContests_dto_1.WrappedGetFixtureContestsResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/:fixtureId/markets'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getFixtureMarkets_dto_1.GetFixtureMarketsRequestDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getActiveFixtureMarkets", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getFixtureContest_1.WrappedGetFixtureContestResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/:fixtureId/contests/:contestId'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __param(1, (0, common_1.Param)('contestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getFixtureContest", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getFixtureContest_1.WrappedGetFixtureContestResponseDto,
        description: 'Success',
    }),
    (0, common_1.Put)('/:fixtureId/contests/:contestId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateFixtureContest_dto_1.UpdateFixtureContestDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "updateFixtureContest", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getFixtureCustomContestIds_dto_1.WrappedGetFixtureCustomContestIdsResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/:fixtureId/custom-contest-ids'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getFixtureCustomContestIds", null);
__decorate([
    (0, common_1.Put)('/contests/:contestId/exclude-participant'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('contestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "excludeParticipant", null);
__decorate([
    (0, common_1.Put)('/contests/:contestId/finish-instance'),
    __param(0, (0, common_1.Param)('contestId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "finishInstance", null);
__decorate([
    (0, common_1.Put)('/contests/:contestId/cancel-instance'),
    __param(0, (0, common_1.Param)('contestId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "cancelInstance", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: postFixtureCreateContestsBulk_dto_1.WrappedPostFixtureCreateContestsBulkResponseDto,
        description: 'Success',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.INVALID_CONTEST_TEMPLATE_IDS_PASSED).getResponse(),
                },
            ],
        },
        description: 'Errors',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/:fixtureId/create-contests-bulk'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, postFixtureCreateContestsBulk_dto_1.PostFixtureCreateContestsBulkRequestDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "postFixtureCreateContestsBulk", null);
__decorate([
    (0, common_1.Post)('/:fixtureId/process'),
    __param(0, (0, common_1.Body)('operationType')),
    __param(1, (0, common_1.Param)('fixtureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "performAction", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: postFixtureStatFreeBets_dto_1.WrappedPostFixtureStartFreeBetsResponseDto,
        description: 'Success',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE).getResponse(),
                },
            ],
        },
        description: 'Errors',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/:fixtureId/start-free-bets'),
    __param(0, (0, common_1.Param)('fixtureId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, postFixtureStatFreeBets_dto_1.PostFixtureStartFreeBetsDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "fixtureStartFreeBet", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/lock-odds'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postLockOddsChange_dto_1.PostLockOddsChangeDto]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "lockOddsChange", null);
__decorate([
    (0, common_1.Get)('/contests/:contestId/dynamic-link'),
    __param(0, (0, common_1.Param)('contestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "getDynamicLink", null);
__decorate([
    (0, common_1.Get)('/instances/:instanceId/participants/:participantId/view-bets'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FixturesCmsController.prototype, "viewBets", null);
FixturesCmsController = FixturesCmsController_1 = __decorate([
    (0, decorators_1.ApiTags)('CMS Fixture Management'),
    (0, common_1.Controller)('cms/fixture-management/fixtures'),
    __metadata("design:paramtypes", [fixture_service_1.FixtureService,
        cms_service_1.CmsService,
        contest_service_1.ContestService,
        contest_instance_service_1.ContestInstanceService,
        contest_instance_participants_service_1.ContestInstanceParticipantsService,
        cancel_service_1.CancelContestInstanceService])
], FixturesCmsController);
exports.FixturesCmsController = FixturesCmsController;
//# sourceMappingURL=fixtures.cms.controller.js.map