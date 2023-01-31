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
exports.WinAmountCalculationService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const tables_1 = require("../../../interfaces/db/tables");
const contest_instance_participants_service_1 = require("../contest-instance-participants/contest-instance-participants.service");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const contestPrizeType_enum_1 = require("../../contest/enums/contestPrizeType.enum");
const currency_1 = require("../../../enums/currency");
let WinAmountCalculationService = class WinAmountCalculationService {
    constructor(participantsService) {
        this.participantsService = participantsService;
    }
    async calculateParticipantWinAmounts(txManager, contestInstanceId, prizeDetails) {
        const prizeWinnerShare = prizeDetails.prizeWinnerShare;
        const prizeType = prizeDetails.prizeType;
        const lastWinPlaceNumber = R.sum(prizeWinnerShare.map(({ winnersNumber }) => winnersNumber));
        const participantLeaderboard = await this.participantsService.getParticipantLeaderboard(txManager, contestInstanceId, lastWinPlaceNumber);
        const ungroupedPrizeAmounts = prizeWinnerShare.reduce((acc, { winnersNumber, exactAmountPerPlace }) => {
            const itemsToAdd = Array(winnersNumber).fill(exactAmountPerPlace);
            return [...acc, ...itemsToAdd];
        }, []);
        const placeToParticipants = R.groupBy(({ place }) => place.toString(), participantLeaderboard);
        const prizeTypeToWinAmountCurrency = {
            [contestPrizeType_enum_1.ContestPrizeType.REAL_MONEY]: currency_1.Currency.REAL_MONEY,
            [contestPrizeType_enum_1.ContestPrizeType.TOKENS]: currency_1.Currency.TOKEN,
        };
        let notAllocatedPrizeAmounts = ungroupedPrizeAmounts;
        const participantWinAmounts = [];
        Object.entries(placeToParticipants)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .forEach(([place, participants]) => {
            const participantCountInPlace = participants.length;
            const prizeAmountForAllocation = R.sum(notAllocatedPrizeAmounts.slice(0, participantCountInPlace));
            const winAmountPrecision = prizeType === contestPrizeType_enum_1.ContestPrizeType.REAL_MONEY ? 2 : 0;
            const winAmount = (prizeAmountForAllocation / participantCountInPlace).toFixed(winAmountPrecision);
            participants.forEach(({ userId }) => {
                participantWinAmounts.push({
                    place,
                    userId,
                    winAmount,
                    currency: prizeTypeToWinAmountCurrency[prizeType],
                });
            });
            notAllocatedPrizeAmounts = notAllocatedPrizeAmounts.slice(participantCountInPlace);
        });
        return participantWinAmounts;
    }
    async calculateParticipantWinAmountsForLeaderboard(txManager, contestInstanceId, prizeDetails, participantLeaderboard) {
        const prizeWinnerShare = prizeDetails.prizeWinnerShare;
        const prizeType = prizeDetails.prizeType;
        const ungroupedPrizeAmounts = prizeWinnerShare.reduce((acc, { winnersNumber, exactAmountPerPlace, fullDescription }) => {
            const itemsToAdd = Array(winnersNumber).fill(contestPrizeType_enum_1.ContestPrizeType.TANGIBLE !== prizeType
                ? exactAmountPerPlace
                : fullDescription);
            return [...acc, ...itemsToAdd];
        }, []);
        const placeToParticipants = R.groupBy(({ place }) => place, participantLeaderboard);
        const prizeTypeToWinAmountCurrency = {
            [contestPrizeType_enum_1.ContestPrizeType.REAL_MONEY]: currency_1.Currency.REAL_MONEY,
            [contestPrizeType_enum_1.ContestPrizeType.TOKENS]: currency_1.Currency.TOKEN,
        };
        let notAllocatedPrizeAmounts = ungroupedPrizeAmounts;
        const participantWinAmounts = [];
        Object.entries(placeToParticipants)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .forEach(([, participants]) => {
            if (contestPrizeType_enum_1.ContestPrizeType.TANGIBLE === prizeType) {
                participants.forEach((participant) => {
                    participantWinAmounts.push(Object.assign(Object.assign({}, participant), { prize: notAllocatedPrizeAmounts[parseInt(participant.place) - 1], prizeType }));
                });
            }
            else {
                const participantCountInPlace = participants.length;
                const prizeAmountForAllocation = R.sum(notAllocatedPrizeAmounts.slice(0, participantCountInPlace));
                const winAmountPrecision = prizeType === contestPrizeType_enum_1.ContestPrizeType.REAL_MONEY ? 2 : 0;
                const winAmount = (prizeAmountForAllocation / participantCountInPlace).toFixed(winAmountPrecision);
                participants.forEach((participant) => {
                    participantWinAmounts.push(Object.assign(Object.assign({}, participant), { prize: winAmount, prizeType: prizeTypeToWinAmountCurrency[prizeType] }));
                });
                notAllocatedPrizeAmounts = notAllocatedPrizeAmounts.slice(participantCountInPlace);
            }
        });
        return participantWinAmounts;
    }
};
WinAmountCalculationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contest_instance_participants_service_1.ContestInstanceParticipantsService])
], WinAmountCalculationService);
exports.WinAmountCalculationService = WinAmountCalculationService;
//# sourceMappingURL=win-amount-calculation.service.js.map