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
exports.CmsTopNavigation = exports.CmsContestsGroupsPeriod = exports.CmsContestDto = exports.CmsForceBet = exports.MarketType = exports.StartPeriod = exports.CmsCompetitionAndPeriod = exports.CmsPeriod = exports.CmsRegistrationTime = exports.CmsRegistrationTimeRegistrationStartPeriod = exports.CmsCompetition = exports.CmsRmEntryRules = exports.CmsEntryRules = exports.PrizeWinnerShare = exports.CmsPrize = exports.CmsContestSize = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CmsContestSize {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsContestSize.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Expose)({ name: 'Min_participants_number' }),
    __metadata("design:type", Number)
], CmsContestSize.prototype, "minParticipantsNumber", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Expose)({ name: 'Max_participants_number' }),
    __metadata("design:type", Number)
], CmsContestSize.prototype, "maxParticipantsNumber", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)({ name: 'Allows_leaving' }),
    __metadata("design:type", Boolean)
], CmsContestSize.prototype, "allowsLeaving", void 0);
exports.CmsContestSize = CmsContestSize;
class CmsPrize {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsPrize.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: '__component' }),
    __metadata("design:type", String)
], CmsPrize.prototype, "component", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Expose)({ name: 'Amount' }),
    __metadata("design:type", Number)
], CmsPrize.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Short_description' }),
    __metadata("design:type", String)
], CmsPrize.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => PrizeWinnerShare),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Winner_share' }),
    __metadata("design:type", Array)
], CmsPrize.prototype, "winnerShare", void 0);
exports.CmsPrize = CmsPrize;
class PrizeWinnerShare {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrizeWinnerShare.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Winners_number' }),
    __metadata("design:type", Number)
], PrizeWinnerShare.prototype, "winnersNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Places' }),
    __metadata("design:type", String)
], PrizeWinnerShare.prototype, "places", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Win_share_per_place' }),
    __metadata("design:type", Number)
], PrizeWinnerShare.prototype, "winSharePerPlace", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Total_share' }),
    __metadata("design:type", Number)
], PrizeWinnerShare.prototype, "totalShare", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Exact_amount_per_place' }),
    __metadata("design:type", Number)
], PrizeWinnerShare.prototype, "exactAmountPerPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Full_description' }),
    __metadata("design:type", String)
], PrizeWinnerShare.prototype, "fullDescription", void 0);
exports.PrizeWinnerShare = PrizeWinnerShare;
class CmsEntryRules {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsEntryRules.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)({ name: 'Free_entry' }),
    __metadata("design:type", Boolean)
], CmsEntryRules.prototype, "freeEntry", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.Amount === null || o.Free_entry === false),
    (0, class_transformer_1.Expose)({ name: 'Tokens_amount' }),
    __metadata("design:type", Number)
], CmsEntryRules.prototype, "tokensAmount", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.Tokens_amount === null && o.Free_entry === null),
    (0, class_transformer_1.Expose)({ name: 'Amount' }),
    __metadata("design:type", Number)
], CmsEntryRules.prototype, "amount", void 0);
exports.CmsEntryRules = CmsEntryRules;
class CmsRmEntryRules {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsRmEntryRules.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)({ name: 'Amount' }),
    __metadata("design:type", Number)
], CmsRmEntryRules.prototype, "amount", void 0);
exports.CmsRmEntryRules = CmsRmEntryRules;
class CmsCompetition {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsCompetition.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Competition_name' }),
    __metadata("design:type", String)
], CmsCompetition.prototype, "competitionName", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)({ name: 'Competition_id' }),
    __metadata("design:type", Number)
], CmsCompetition.prototype, "competitionId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'sport_competition_id' }),
    __metadata("design:type", Number)
], CmsCompetition.prototype, "sportCompetitionId", void 0);
exports.CmsCompetition = CmsCompetition;
class CmsRegistrationTimeRegistrationStartPeriod {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CmsRegistrationTimeRegistrationStartPeriod.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)({ name: 'period_name' }),
    __metadata("design:type", String)
], CmsRegistrationTimeRegistrationStartPeriod.prototype, "periodName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)({ name: 'period_id' }),
    __metadata("design:type", String)
], CmsRegistrationTimeRegistrationStartPeriod.prototype, "periodId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)({ name: 'competition' }),
    __metadata("design:type", Array)
], CmsRegistrationTimeRegistrationStartPeriod.prototype, "competitions", void 0);
exports.CmsRegistrationTimeRegistrationStartPeriod = CmsRegistrationTimeRegistrationStartPeriod;
class CmsRegistrationTime {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsRegistrationTime.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Registration_start_time' }),
    __metadata("design:type", Number)
], CmsRegistrationTime.prototype, "registrationStartTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CmsRegistrationTimeRegistrationStartPeriod),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Registration_start_period' }),
    __metadata("design:type", CmsRegistrationTimeRegistrationStartPeriod)
], CmsRegistrationTime.prototype, "registrationStartPeriod", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Cancellation_time' }),
    __metadata("design:type", Number)
], CmsRegistrationTime.prototype, "cancellationTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Late_entry_period' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value) {
            return null;
        }
        const { period_id: periodId } = value;
        return periodId;
    }),
    __metadata("design:type", String)
], CmsRegistrationTime.prototype, "lateEntryPeriodId", void 0);
exports.CmsRegistrationTime = CmsRegistrationTime;
class CmsPeriod {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsPeriod.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'period_name' }),
    __metadata("design:type", String)
], CmsPeriod.prototype, "periodName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'period_id' }),
    __metadata("design:type", String)
], CmsPeriod.prototype, "periodId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'parent_id' }),
    __metadata("design:type", String)
], CmsPeriod.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)({ name: 'competition' }),
    __metadata("design:type", Array)
], CmsPeriod.prototype, "competitions", void 0);
exports.CmsPeriod = CmsPeriod;
class CmsCompetitionAndPeriod {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsCompetitionAndPeriod.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)({ name: 'Competition' }),
    (0, class_transformer_1.Type)(() => CmsCompetition),
    __metadata("design:type", Array)
], CmsCompetitionAndPeriod.prototype, "competitions", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CmsPeriod),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Period' }),
    __metadata("design:type", CmsPeriod)
], CmsCompetitionAndPeriod.prototype, "period", void 0);
exports.CmsCompetitionAndPeriod = CmsCompetitionAndPeriod;
class StartPeriod {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], StartPeriod.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'period_name' }),
    __metadata("design:type", String)
], StartPeriod.prototype, "periodName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'period_id' }),
    __metadata("design:type", String)
], StartPeriod.prototype, "periodId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'parent_id' }),
    __metadata("design:type", String)
], StartPeriod.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)({ name: 'competition' }),
    __metadata("design:type", Array)
], StartPeriod.prototype, "competitions", void 0);
exports.StartPeriod = StartPeriod;
class MarketType {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], MarketType.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Market_type' }),
    __metadata("design:type", String)
], MarketType.prototype, "marketType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Type_id' }),
    __metadata("design:type", String)
], MarketType.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Description' }),
    __metadata("design:type", String)
], MarketType.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], MarketType.prototype, "sport", void 0);
exports.MarketType = MarketType;
class CmsForceBet {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsForceBet.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Duration_min' }),
    __metadata("design:type", Number)
], CmsForceBet.prototype, "durationMin", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => StartPeriod),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Start_period' }),
    __metadata("design:type", StartPeriod)
], CmsForceBet.prototype, "startPeriod", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Delay_min' }),
    __metadata("design:type", Number)
], CmsForceBet.prototype, "delayMin", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Bet_limit' }),
    __metadata("design:type", Number)
], CmsForceBet.prototype, "betLimit", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => MarketType),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Market_type' }),
    __metadata("design:type", Array)
], CmsForceBet.prototype, "marketTypes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Info_text' }),
    __metadata("design:type", String)
], CmsForceBet.prototype, "info", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Title' }),
    __metadata("design:type", String)
], CmsForceBet.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Notify_in_sec' }),
    __metadata("design:type", Number)
], CmsForceBet.prototype, "notifyInSec", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)({ name: 'Lock_odds' }),
    __metadata("design:type", Boolean)
], CmsForceBet.prototype, "lockOdds", void 0);
exports.CmsForceBet = CmsForceBet;
class CmsContestDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CmsContestDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Product_type' }),
    __metadata("design:type", String)
], CmsContestDto.prototype, "productType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Contest_name' }),
    __metadata("design:type", String)
], CmsContestDto.prototype, "contestName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Contest_type' }),
    __metadata("design:type", String)
], CmsContestDto.prototype, "contestType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CmsContestSize),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Contest_size' }),
    __metadata("design:type", CmsContestSize)
], CmsContestDto.prototype, "contestSize", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'Bankroll_amount' }),
    __metadata("design:type", Number)
], CmsContestDto.prototype, "bankrollAmount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CmsPrize),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Prize' }),
    __metadata("design:type", Array)
], CmsContestDto.prototype, "prizes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CmsEntryRules),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Entry_rules' }),
    __metadata("design:type", CmsEntryRules)
], CmsContestDto.prototype, "entryRules", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CmsRmEntryRules),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'RM_Entry_rules' }),
    __metadata("design:type", CmsRmEntryRules)
], CmsContestDto.prototype, "RMEntryRules", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CmsRegistrationTime),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Registration_time' }),
    __metadata("design:type", CmsRegistrationTime)
], CmsContestDto.prototype, "registrationTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Market_groups' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === void 0 ? void 0 : value.Market_groups) {
            const [{ market_group_id }] = value === null || value === void 0 ? void 0 : value.Market_groups;
            return market_group_id;
        }
    }),
    __metadata("design:type", Number)
], CmsContestDto.prototype, "marketGroupId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CmsCompetitionAndPeriod),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'CompetitionAndPeriod' }),
    __metadata("design:type", CmsCompetitionAndPeriod)
], CmsContestDto.prototype, "competitionAndPeriod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CmsForceBet),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Expose)({ name: 'Force_bet' }),
    __metadata("design:type", Array)
], CmsContestDto.prototype, "forceBets", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'Contest_owner' }),
    __metadata("design:type", String)
], CmsContestDto.prototype, "contestOwner", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'Home_visible' }),
    __metadata("design:type", Boolean)
], CmsContestDto.prototype, "homeVisible", void 0);
exports.CmsContestDto = CmsContestDto;
class CmsContestsGroupsPeriod {
}
exports.CmsContestsGroupsPeriod = CmsContestsGroupsPeriod;
class CmsTopNavigation {
}
exports.CmsTopNavigation = CmsTopNavigation;
//# sourceMappingURL=contest.dto.js.map