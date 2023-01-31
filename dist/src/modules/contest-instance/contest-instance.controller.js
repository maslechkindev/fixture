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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const R = require("ramda");
const user_decorator_1 = require("../../decorators/user.decorator");
const errors_1 = require("../../helpers/errors");
const decorators_1 = require("../../helpers/swagger/decorators");
const user_interface_1 = require("../../interfaces/user.interface");
const contest_instance_service_1 = require("./contest-instance.service");
const registerToContestInstance_dto_1 = require("./dto/registerToContestInstance.dto");
const getLiveAndUpcomingInstances_dto_1 = require("./dto/getLiveAndUpcomingInstances.dto");
const activeContestInstances_dto_1 = require("./dto/activeContestInstances.dto");
const withdrawFromContestInstance_dto_1 = require("./dto/withdrawFromContestInstance.dto");
const placeBet_dto_1 = require("./dto/placeBet.dto");
const contestInstanceStatus_enum_1 = require("./enums/contestInstanceStatus.enum");
const realtime_db_service_1 = require("../integrations/firebase/realtime-db/realtime-db.service");
const priceStatus_enum_1 = require("./enums/priceStatus.enum");
const pendingAndSettledBets_dto_1 = require("./dto/pendingAndSettledBets.dto");
const userBetsHistory_dto_1 = require("./dto/userBetsHistory.dto");
const getContestInstanceLeaderboard_dto_1 = require("./dto/getContestInstanceLeaderboard.dto");
const getContestInstanceUserMaxBetLimit_dto_1 = require("./dto/getContestInstanceUserMaxBetLimit.dto");
const contestPrizeType_enum_1 = require("../contest/enums/contestPrizeType.enum");
const force_bets_service_1 = require("../contest/force-bets/force-bets.service");
const date_fns_1 = require("date-fns");
const personal_details_service_1 = require("../user-management/profile/personal-details/personal-details.service");
const contest_instance_participants_service_1 = require("./contest-instance-participants/contest-instance-participants.service");
let ContestInstanceController = class ContestInstanceController {
    constructor(contestInstanceService, contestInstanceParticipantsService, realtimeDbService, personalDetailsService, forceBetService) {
        this.contestInstanceService = contestInstanceService;
        this.contestInstanceParticipantsService = contestInstanceParticipantsService;
        this.realtimeDbService = realtimeDbService;
        this.personalDetailsService = personalDetailsService;
        this.forceBetService = forceBetService;
    }
    async getActiveContestInstances({ fixtureId, periodId, limit, contestTypes }, user) {
        const l = periodId ? null : limit;
        const contestTypesParams = contestTypes
            ? contestTypes.filter((el) => el.trim().length)
            : [];
        const contests = await this.contestInstanceService.getActiveContestInstances(fixtureId, periodId, l, user ? user.id : null, contestTypesParams);
        return contests;
    }
    async registerToContestInstance(userDetails, { contestInstanceId }) {
        await this.contestInstanceService.registerParticipantToContestInstance(userDetails, contestInstanceId);
        return { success: true };
    }
    async getUserContestsInstancesWithStatuses(user, userId, params) {
        const { limit, statuses, page } = params;
        const userByUserId = await this.personalDetailsService.getUserById(userId);
        if (!userByUserId) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.INVALID_ID);
        }
        const validStatuses = this.contestInstanceService.validateStatuses(statuses);
        const data = await this.contestInstanceService.getUserContestsInstancesWithStatuses(userId, limit, page, validStatuses, user);
        return { success: true, data };
    }
    async withdrawFromContestInstance({ id: userId }, { contestInstanceId }) {
        await this.contestInstanceService.withdrawParticipantFromContestInstance(userId, contestInstanceId);
        return { success: true };
    }
    async placeBet({ id: userId }, { contestInstanceId, marketLineId, betAmount, americanOdds, winAmount, isForcedBet, }) {
        var e_1, _a;
        let forcedBetId = null;
        let forcedBetLimit = null;
        let forcedBetAmount = null;
        let forcedWinAmount = null;
        let forceBet = null;
        let lockedOdds = null;
        const contestInstanceDetails = await this.contestInstanceService.getContestInstanceDetails(contestInstanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED);
        }
        const participantContestInstanceInfo = await this.contestInstanceService.getParticipantContestInstanceInfo(contestInstanceId, userId);
        if (!participantContestInstanceInfo) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS);
        }
        if (contestInstanceDetails.status !== contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.CONTEST_IS_NOT_LIVE);
        }
        if (betAmount > participantContestInstanceInfo.bankrollBalance &&
            !isForcedBet) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_ENOUGH_BANKROLL_AMOUNT);
        }
        const marketLineDetails = await this.contestInstanceService.getMarketLineDetails(marketLineId, contestInstanceDetails.fixtureId);
        if (!marketLineDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_MARKET_LINE_ID_PROVIDED);
        }
        const forceBetActive = await this.forceBetService.getForceBets(null, {
            contestId: contestInstanceDetails.contestId,
            isActive: true,
        });
        if (Array.isArray(forceBetActive) && forceBetActive.length > 0) {
            try {
                outer: for (var forceBetActive_1 = __asyncValues(forceBetActive), forceBetActive_1_1; forceBetActive_1_1 = await forceBetActive_1.next(), !forceBetActive_1_1.done;) {
                    const fb = forceBetActive_1_1.value;
                    const marketTypeId = fb.marketTypeId;
                    const marketTypeBets = await this.contestInstanceService.getBetsForMarketType(null, { userId, contestInstanceId, marketLineId }, marketTypeId);
                    for (const bet of marketTypeBets) {
                        const betWithinForceBetPeriod = (0, date_fns_1.isWithinInterval)(bet.betTime, {
                            start: fb.createdAt,
                            end: (0, date_fns_1.addMinutes)(fb.createdAt, fb.durationMin),
                        });
                        if (betWithinForceBetPeriod === true) {
                            if (isForcedBet === true) {
                                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.FORCE_BET_ATTEMPT_TO_BET_ALREADY_FORCED_MARKET);
                            }
                            forcedBetId = null;
                            forcedBetLimit = null;
                            break outer;
                        }
                    }
                    if (Array.isArray(marketTypeId) &&
                        marketTypeId.includes(marketLineDetails.marketTypeId)) {
                        forcedBetId = fb.id;
                        forceBet = fb;
                        lockedOdds = fb.lockOdds && fb.lockOdds[marketLineId];
                        if (typeof lockedOdds.americanOdds === 'string' &&
                            Number.isFinite(parseFloat(lockedOdds.americanOdds))) {
                            lockedOdds.americanOdds = parseFloat(lockedOdds.americanOdds);
                        }
                        forcedBetLimit = fb.betLimit;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (forceBetActive_1_1 && !forceBetActive_1_1.done && (_a = forceBetActive_1.return)) await _a.call(forceBetActive_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (((Array.isArray(forceBetActive) && forceBetActive.length === 0) ||
            !forceBetActive) &&
            isForcedBet === true) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.FORCE_BET_ATTEMPT_WITHOUT_FORCE_BET_RUNNING);
        }
        if (forcedBetId === null && isForcedBet === true) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.FORCE_BET_ATTEMPT_WITHOUT_FORCE_BET_RUNNING);
        }
        const marketLinePriceDetails = await this.contestInstanceService.getMarketLinePriceDetails(marketLineId);
        if (!marketLinePriceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_MARKET_LINE_ID_PROVIDED);
        }
        if (marketLinePriceDetails.statusId !== priceStatus_enum_1.PriceStatus.STANDARD) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.MARKET_LINE_IS_NOT_AVAILABLE);
        }
        const marketLinePricePath = `market-line-prices/${marketLinePriceDetails.priceId}`;
        const marketPriceDetails = await this.realtimeDbService.get(marketLinePricePath);
        if (forcedBetId !== null && forcedBetLimit && forceBet && lockedOdds) {
            if (lockedOdds.americanOdds !== americanOdds) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.LOCKED_ODDS_DONT_MATCH);
            }
        }
        else if (Number(marketPriceDetails.americanOdds) !== americanOdds) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.ODDS_HAS_CHANGED);
        }
        const maxBetLimitInfo = await this.contestInstanceService.getMaxBetLimitInfo(contestInstanceId, userId, marketLineId);
        const playerMaxBetLimit = maxBetLimitInfo
            ? maxBetLimitInfo.maxBetLimit
            : marketLineDetails.maxBetLimit;
        if (forcedBetId !== null && forcedBetLimit) {
            const { betAmount: calculatedForcedBetAmount, winAmount: calculatedForcedWinAmount, } = this.contestInstanceService.calculateForcedBetAndWinAmounts(lockedOdds ? lockedOdds.americanOdds : americanOdds, forcedBetLimit);
            forcedBetAmount = calculatedForcedBetAmount;
            forcedWinAmount = calculatedForcedWinAmount;
            if (Math.abs(winAmount - forcedWinAmount) > 0.01) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.FORCE_BET_INVALID_WIN_AMOUNT);
            }
            if (betAmount !== forcedBetAmount) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.FORCE_BET_INVALID_BET_AMOUNT);
            }
        }
        else {
            const winAmountCalculated = this.contestInstanceService.calculateWinAmount(betAmount, americanOdds);
            if (Math.abs(winAmount - winAmountCalculated) > 0.01) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_WIN_AMOUNT);
            }
            if (betAmount < marketLineDetails.minBetLimit) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.BET_AMOUNT_LESS_THAN_MIN_ALLOWED);
            }
            if (betAmount > playerMaxBetLimit && americanOdds > 0) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.BET_AMOUNT_EXCEED_MAX_ALLOWED);
            }
            if (winAmount > playerMaxBetLimit && americanOdds < 0) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.WIN_AMOUNT_EXCEED_MAX_ALLOWED);
            }
        }
        const roundFunction = (value) => contestInstanceDetails.balanceLong ? value : Math.round(value);
        const betDetails = {
            marketLineId: marketLineDetails.marketLineId,
            lineName: marketLineDetails.lineName,
            marketId: marketLineDetails.marketId,
            marketName: marketLineDetails.marketName,
            americanOdds: isForcedBet && lockedOdds
                ? lockedOdds.americanOdds
                : marketPriceDetails.americanOdds,
            betAmount: roundFunction(isForcedBet ? forcedBetAmount : betAmount),
            winAmount: roundFunction(isForcedBet ? forcedWinAmount : winAmount),
            contestInstanceId,
            contestId: contestInstanceDetails.contestId,
            userId,
            currentMaxBetLimit: playerMaxBetLimit,
        };
        if (forcedBetId !== null) {
            await this.contestInstanceService.placeForcedBet(betDetails, forcedBetId);
        }
        else {
            await this.contestInstanceService.placeBet(betDetails);
        }
        return { success: true };
    }
    async getParticipantBets(user, params) {
        const { participantId, status, contestInstanceId, page, size, sortField } = params;
        const constestInstanceDetails = await this.contestInstanceService.getContestInstanceDetails(contestInstanceId);
        if (!constestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.BETS.NOT_ACCESSIBLE);
        }
        const isRequesterParticipant = await this.contestInstanceParticipantsService.isUserParticipant(contestInstanceId, user);
        if (!isRequesterParticipant &&
            constestInstanceDetails.status !== contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.BETS.NOT_ACCESSIBLE);
        }
        const isUserParticipant = await this.contestInstanceParticipantsService.isUserParticipant(contestInstanceId, { id: participantId });
        if (!isUserParticipant) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.BETS.USER_NOT_PARTICIPANT);
        }
        const bets = await this.contestInstanceService.getParticipantBets(participantId, status, contestInstanceId, page, size, sortField);
        return bets;
    }
    async getUserBalance({ id: userId }, { contestInstanceId }) {
        const userContestInstanceBalances = await this.contestInstanceService.getUserBalance(userId, contestInstanceId);
        if (!userContestInstanceBalances) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_REGISTERED_TO_CONTEST_INSTANCE);
        }
        return R.pick(['totalBalance', 'bankrollBalance'], userContestInstanceBalances);
    }
    async getContestInstanceLeaderboard({ id: userId }, { contestInstanceId, page, size, followingOnly, }) {
        const contestInstanceDetails = await this.contestInstanceService.getContestInstanceDetails(contestInstanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED);
        }
        if (![
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
            contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED,
        ].includes(contestInstanceDetails.status)) {
            return { leaderboard: [], playerInfo: {} };
        }
        const leaderboardFull = await this.contestInstanceService.getContestInstanceLeaderboard(contestInstanceId, contestInstanceDetails, userId, followingOnly);
        if (leaderboardFull &&
            contestInstanceDetails.prizeType === contestPrizeType_enum_1.ContestPrizeType.TANGIBLE) {
            const leaderBoardDictionary = leaderboardFull.reduce((acc, cur) => {
                if (!cur.prizePlace)
                    return acc;
                if (acc[cur.place]) {
                    return Object.assign(Object.assign({}, acc), { [cur.place]: [...acc[cur.place], cur.userId] });
                }
                return Object.assign(Object.assign({}, acc), { [cur.place]: [cur.userId] });
            }, {});
            const mappedLeaderBoard = leaderboardFull.reduce((acc, cur) => {
                const { place, userId } = cur;
                if (leaderBoardDictionary[place] &&
                    leaderBoardDictionary[place].length > 1 &&
                    leaderBoardDictionary[place].includes(userId)) {
                    return [
                        ...acc,
                        Object.assign(Object.assign({}, cur), { prize: 'Prize to be clarified by SH team ' }),
                    ];
                }
                return [...acc, cur];
            }, []);
            const result = this.contestInstanceService.parceParticipantLeaderBoard(mappedLeaderBoard, page, size, userId);
            return result;
        }
        return this.contestInstanceService.parceParticipantLeaderBoard(leaderboardFull, page, size, userId);
    }
    async getContestInstanceLeaderboardV2(user, { contestInstanceId, page, size, followingOnly, }, requestedUserId) {
        const { id: userId } = user || {};
        const contestInstanceDetails = await this.contestInstanceService.getContestInstanceDetails(contestInstanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED);
        }
        const isUserParticipant = await this.contestInstanceParticipantsService.isUserParticipant(contestInstanceId, user);
        const isRequestedUserParticipant = await this.contestInstanceParticipantsService.isUserParticipant(contestInstanceId, { id: requestedUserId });
        if (![
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
            contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED,
        ].includes(contestInstanceDetails.status)) {
            return { leaderboard: [], playerInfo: {}, myInfo: {} };
        }
        let leaderboardFull = await this.contestInstanceService.getContestInstanceLeaderboard(contestInstanceId, contestInstanceDetails, requestedUserId, followingOnly);
        if (!leaderboardFull) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.UNAUTHORIZED_TO_VIEW_LEADERBOARD);
        }
        if (contestInstanceDetails.prizeType === contestPrizeType_enum_1.ContestPrizeType.TANGIBLE) {
            const usersPerPrizePlace = leaderboardFull.reduce((acc, cur) => {
                if (!cur.prizePlace) {
                    return acc;
                }
                if (acc[cur.place]) {
                    return Object.assign(Object.assign({}, acc), { [cur.place]: [...acc[cur.place], cur.userId] });
                }
                return Object.assign(Object.assign({}, acc), { [cur.place]: [cur.userId] });
            }, {});
            const mappedLeaderBoard = leaderboardFull.reduce((acc, cur) => {
                const { place, userId } = cur;
                if (usersPerPrizePlace[place] &&
                    usersPerPrizePlace[place].length > 1 &&
                    usersPerPrizePlace[place].includes(userId)) {
                    return [
                        ...acc,
                        Object.assign(Object.assign({}, cur), { prize: 'Prize to be clarified by SH team ' }),
                    ];
                }
                return [...acc, cur];
            }, []);
            leaderboardFull = mappedLeaderBoard;
        }
        const slicedLeaderboard = this.contestInstanceService.sliceLeaderboard(leaderboardFull, page, size);
        if (userId === requestedUserId) {
            if (isUserParticipant) {
                const myInfo = this.contestInstanceService.getPlayerInfoByUserId(leaderboardFull, userId);
                return {
                    leaderboard: slicedLeaderboard,
                    playerInfo: {},
                    myInfo,
                };
            }
            return {
                leaderboard: slicedLeaderboard,
                playerInfo: {},
                myInfo: {},
            };
        }
        if (contestInstanceDetails.status === contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED) {
            if (isRequestedUserParticipant) {
                if (followingOnly) {
                    throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.UNAUTHORIZED_TO_VIEW_LEADERBOARD);
                }
                if (isUserParticipant) {
                    const playerInfo = this.contestInstanceService.getPlayerInfoByUserId(leaderboardFull, requestedUserId);
                    const myInfo = this.contestInstanceService.getPlayerInfoByUserId(leaderboardFull, userId);
                    return {
                        leaderboard: slicedLeaderboard,
                        playerInfo,
                        myInfo,
                    };
                }
                const playerInfo = this.contestInstanceService.getPlayerInfoByUserId(leaderboardFull, requestedUserId);
                return {
                    leaderboard: slicedLeaderboard,
                    playerInfo,
                    myInfo: {},
                };
            }
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.USER_ID_IS_NOT_PARTICIPANT);
        }
        throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.UNAUTHORIZED_TO_VIEW_LEADERBOARD);
    }
    async getContestInstanceUserMaxBetLimit({ id: userId }, { contestInstanceId, marketLineId, }) {
        const contestInstanceDetails = await this.contestInstanceService.getContestInstanceDetails(contestInstanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED);
        }
        const participantContestInstanceInfo = await this.contestInstanceService.getParticipantContestInstanceInfo(contestInstanceId, userId);
        if (!participantContestInstanceInfo) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS);
        }
        if (contestInstanceDetails.status !== contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.CONTEST_IS_NOT_LIVE);
        }
        const marketLineDetails = await this.contestInstanceService.getMarketLineDetails(marketLineId, contestInstanceDetails.fixtureId);
        if (!marketLineDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_MARKET_LINE_ID_PROVIDED);
        }
        const maxBetLimitInfo = await this.contestInstanceService.getMaxBetLimitInfo(contestInstanceId, userId, marketLineId);
        const userMaxBetLimit = maxBetLimitInfo
            ? maxBetLimitInfo.maxBetLimit
            : marketLineDetails.maxBetLimit;
        return {
            maxBetLimit: +userMaxBetLimit,
            minBetLimit: marketLineDetails.minBetLimit,
        };
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: activeContestInstances_dto_1.WrappedActiveContestInstancesResponseDto,
        description: 'get list of active contest instances grouped by period',
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.CONTEST.FIXTURE_ID_REQUIRED },
    ]),
    (0, common_1.Get)('/list/active'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [activeContestInstances_dto_1.ActiveContestInstancesDto, Object]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getActiveContestInstances", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: registerToContestInstance_dto_1.WrappedRegisterToContestInstanceDtoResponseDto,
        description: 'User have been registered to the contest instance',
    }),
    (0, decorators_1.ApiUnauthorizedResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.AUTH.UNAUTHORIZED },
        {
            summary: 'User is visitor',
            exceptionBody: errors_1.ERRORS.CONTEST.NOT_AUTHORIZED_TO_ENTER,
        },
    ]),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.CONTEST.NOT_ENOUGH_MONEY },
        { exceptionBody: errors_1.ERRORS.CONTEST.CONTEST_INSTANCE_FULL },
        { exceptionBody: errors_1.ERRORS.CONTEST.ALREADY_REGISTERED_TO_CONTEST },
        { exceptionBody: errors_1.ERRORS.CONTEST.REGISTRATION_CLOSED },
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED },
    ]),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/registration'),
    __param(0, (0, user_decorator_1.User)(['id', 'username', 'avatar'])),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, registerToContestInstance_dto_1.RegisterToContestInstanceDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "registerToContestInstance", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getLiveAndUpcomingInstances_dto_1.WrappedGetUserInstanceResponseDto,
        description: 'all contest instances of user',
    }),
    (0, common_1.Get)('/user/:userId/contest-instances'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, getLiveAndUpcomingInstances_dto_1.GetUserInstanceParamsDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getUserContestsInstancesWithStatuses", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: withdrawFromContestInstance_dto_1.WrappedWithdrawFromContestInstanceResponseDto,
        description: 'User have been withdrawn from the contest instance',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_STATUS_PROVIDED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.CONTEST_INSTANCE_WITHDRAW_NOT_ALLOWED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS).getResponse(),
                },
            ],
        },
        description: 'Invalid statuses were sent',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/withdraw'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, withdrawFromContestInstance_dto_1.WithdrawFromContestInstanceDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "withdrawFromContestInstance", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: placeBet_dto_1.WrappedPlaceBetResponseDto,
        description: 'User places bet successfully',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED },
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_MARKET_LINE_ID_PROVIDED },
        { exceptionBody: errors_1.ERRORS.CONTEST.BET_AMOUNT_REQUIRED_POSITIVE },
        { exceptionBody: errors_1.ERRORS.CONTEST.ODDS_REQUIRED },
        { exceptionBody: errors_1.ERRORS.CONTEST.NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS },
        { exceptionBody: errors_1.ERRORS.CONTEST.NOT_ENOUGH_BANKROLL_AMOUNT },
        { exceptionBody: errors_1.ERRORS.CONTEST.ODDS_HAS_CHANGED },
        { exceptionBody: errors_1.ERRORS.CONTEST.MARKET_LINE_IS_NOT_AVAILABLE },
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_WIN_AMOUNT },
        { exceptionBody: errors_1.ERRORS.CONTEST.BET_AMOUNT_EXCEED_MAX_ALLOWED },
        { exceptionBody: errors_1.ERRORS.CONTEST.BET_AMOUNT_LESS_THAN_MIN_ALLOWED },
        { exceptionBody: errors_1.ERRORS.CONTEST.WIN_AMOUNT_EXCEED_MAX_ALLOWED },
        { exceptionBody: errors_1.ERRORS.CONTEST.FORCE_BET_INVALID_MARKET_TYPE },
        { exceptionBody: errors_1.ERRORS.CONTEST.FORCE_BET_INVALID_WIN_AMOUNT },
    ]),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/place-bet'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, placeBet_dto_1.PlaceBetDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "placeBet", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: pendingAndSettledBets_dto_1.WrappedGetUserBetsResponseDto,
        description: 'Users bets with pending or settled statuses',
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.BETS.USER_NOT_PARTICIPANT },
        { exceptionBody: errors_1.ERRORS.BETS.NOT_ACCESSIBLE },
    ]),
    (0, common_1.Get)('/bets'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pendingAndSettledBets_dto_1.getUserBetsDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getParticipantBets", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: userBetsHistory_dto_1.WrappedUserBalanceResponseDto,
        description: 'User balance',
    }),
    (0, common_1.Get)('/user-balance'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userBetsHistory_dto_1.getUserBalanceDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getUserBalance", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getContestInstanceLeaderboard_dto_1.WrappedGetContestInstanceLeaderboardResponseDto,
        description: 'Get contest instance leaderboard and player leaderboard info',
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED },
        { exceptionBody: errors_1.ERRORS.CONTEST.NOT_AUTHORIZED_TO_ENTER },
    ]),
    (0, common_1.Get)('/leaderboard'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getContestInstanceLeaderboard_dto_1.GetContestInstanceLeaderboardRequestDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getContestInstanceLeaderboard", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getContestInstanceLeaderboard_dto_1.WrappedGetContestInstanceLeaderboardResponseDto,
        description: 'Get contest instance leaderboard and player leaderboard info',
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED },
        { exceptionBody: errors_1.ERRORS.CONTEST.NOT_AUTHORIZED_TO_ENTER },
    ]),
    (0, common_1.Get)('/leaderboard/v2/:userId'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getContestInstanceLeaderboard_dto_1.GetContestInstanceLeaderboardRequestDto, String]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getContestInstanceLeaderboardV2", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getContestInstanceUserMaxBetLimit_dto_1.WrappedGetContestInstanceUserMaxBetLimitResponseDto,
        description: 'Get contest instance user max bet limit for market line',
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED },
        { exceptionBody: errors_1.ERRORS.CONTEST.INVALID_MARKET_LINE_ID_PROVIDED },
        { exceptionBody: errors_1.ERRORS.CONTEST.NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS },
        { exceptionBody: errors_1.ERRORS.CONTEST.CONTEST_IS_NOT_LIVE },
    ]),
    (0, common_1.Get)('/user-bet-limits'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getContestInstanceUserMaxBetLimit_dto_1.GetContestInstanceUserMaxBetLimitRequestDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceController.prototype, "getContestInstanceUserMaxBetLimit", null);
ContestInstanceController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Contest instance'),
    (0, common_1.Controller)('contest-instance'),
    __metadata("design:paramtypes", [contest_instance_service_1.ContestInstanceService,
        contest_instance_participants_service_1.ContestInstanceParticipantsService,
        realtime_db_service_1.RealtimeDbService,
        personal_details_service_1.PersonalDetailsService,
        force_bets_service_1.ForceBetsService])
], ContestInstanceController);
exports.ContestInstanceController = ContestInstanceController;
//# sourceMappingURL=contest-instance.controller.js.map