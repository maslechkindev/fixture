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
var PageImagesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageImagesService = void 0;
const common_1 = require("@nestjs/common");
const google_cloud_storage_service_1 = require("../integrations/google-cloud-storage/google-cloud-storage.service");
const errors_1 = require("../../helpers/errors");
const contestInstanceStatus_enum_1 = require("../contest-instance/enums/contestInstanceStatus.enum");
const contestPrizeType_enum_1 = require("../contest/enums/contestPrizeType.enum");
const main_1 = require("./templates/leaderboard/Leaderboard/main");
const row_1 = require("./templates/leaderboard/Leaderboard/components/row");
const contest_instance_participants_service_1 = require("../contest-instance/contest-instance-participants/contest-instance-participants.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const screenshot_1 = require("./screenshot");
let PageImagesService = PageImagesService_1 = class PageImagesService {
    constructor(contestInstanceParticipantsService, contestInstanceService, googleCloudStorageService) {
        this.contestInstanceParticipantsService = contestInstanceParticipantsService;
        this.contestInstanceService = contestInstanceService;
        this.googleCloudStorageService = googleCloudStorageService;
        this.logger = new common_1.Logger(PageImagesService_1.name);
    }
    async generateLeaderboardImage(user, contestId, instanceId, userId) {
        const path = `${contestId}-${instanceId}-${userId}`;
        try {
            const existingImage = await this.googleCloudStorageService.get(path);
            return existingImage.buffer;
        }
        catch (err) {
            if (!err.message.includes('No such object')) {
                this.logger.error(err.stack);
            }
        }
        const contestInstanceDetails = await this.contestInstanceService.getContestInstanceDetails(instanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.LEADERBOARD_SHARING.INVALID_CONTEST_INSTANCE_ID);
        }
        if (contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED !== contestInstanceDetails.status) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.LEADERBOARD_SHARING.SHARING_NOT_ALLOWED_FOR_NOT_FINISHED_CONTEST);
        }
        const isUserParticipant = await this.contestInstanceParticipantsService.isUserParticipant(instanceId, { id: userId });
        if ((user === null || user === void 0 ? void 0 : user.id) === userId && !isUserParticipant) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.LEADERBOARD_SHARING.UNAUTHORIZED_TO_SHARE_LEADERBOARD);
        }
        let leaderboardFull = await this.contestInstanceService.getContestInstanceLeaderboard(instanceId, contestInstanceDetails, userId, false);
        const myInfo = this.contestInstanceService.getPlayerInfoByUserId(leaderboardFull, userId);
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
        const slicedLeaderboard = this.contestInstanceService.sliceLeaderboard(leaderboardFull, 1, 6);
        const rows = slicedLeaderboard.map((row) => {
            return {
                place: row.place,
                userName: row.username,
                totalPoints: (+row.totalBalance).toLocaleString('en-US'),
                prizeCurrency: row.prizeType === 'token'
                    ? row_1.PrizeCurrency.tokens
                    : row.prizeType === 'real_money'
                        ? row_1.PrizeCurrency.realMoney
                        : null,
                prizeAmountOrTangible: Number.isFinite(row.prize)
                    ? row.prize.toLocaleString('en-US')
                    : typeof row.prize === 'string' &&
                        Number.isFinite(parseFloat(row.prize))
                        ? parseFloat(row.prize).toLocaleString('en-US')
                        : row.prize,
                isUser: row.userId === userId,
            };
        });
        if (myInfo) {
            rows.push({
                place: myInfo.place,
                userName: myInfo.username,
                totalPoints: (+myInfo.totalBalance).toLocaleString('en-US'),
                prizeCurrency: myInfo.prizeType === 'token'
                    ? row_1.PrizeCurrency.tokens
                    : myInfo.prizeType === 'real_money'
                        ? row_1.PrizeCurrency.realMoney
                        : null,
                prizeAmountOrTangible: Number.isFinite(myInfo.prize)
                    ? myInfo.prize.toLocaleString('en-US')
                    : typeof myInfo.prize === 'string' &&
                        Number.isFinite(parseFloat(myInfo.prize))
                        ? parseFloat(myInfo.prize).toLocaleString('en-US')
                        : myInfo.prize,
                isUser: myInfo.userId === userId,
            });
        }
        const html = (0, main_1.main)(rows);
        const image = await (0, screenshot_1.nodeHtmlToImage)({
            html,
        });
        this.googleCloudStorageService
            .save(path, 'image/png', image, [])
            .catch((err) => this.logger.error(err.stack));
        return image;
    }
};
PageImagesService = PageImagesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contest_instance_participants_service_1.ContestInstanceParticipantsService,
        contest_instance_service_1.ContestInstanceService,
        google_cloud_storage_service_1.GoogleCloudStorageService])
], PageImagesService);
exports.PageImagesService = PageImagesService;
//# sourceMappingURL=page-images.service.js.map