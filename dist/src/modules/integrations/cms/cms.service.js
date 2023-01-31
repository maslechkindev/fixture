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
var CmsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const R = require("ramda");
const config_1 = require("../../../config");
const purchase_dto_1 = require("./dto/purchase.dto");
const errors_1 = require("../../../helpers/errors");
const contest_dto_1 = require("./dto/contest.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const purchasesOrderItem_dto_1 = require("../../purchase/dto/purchasesOrderItem.dto");
const marketGroups_dto_1 = require("./dto/marketGroups.dto");
let CmsService = CmsService_1 = class CmsService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(CmsService_1.name);
    }
    async getRealMoneyState(defaultValueInFailureCase = false) {
        try {
            const response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_SH_CONFIGURATIONS}`)
                .toPromise();
            return response.data.USD;
        }
        catch (err) {
            console.error(err);
            return defaultValueInFailureCase;
        }
    }
    async getBalanceLongState(defaultValueInFailureCase = false) {
        try {
            const response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_SH_CONFIGURATIONS}`)
                .toPromise();
            return response.data.Bankrol_balance_long;
        }
        catch (err) {
            console.error(err);
            return defaultValueInFailureCase;
        }
    }
    async getPurchaseById(id) {
        try {
            const response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_PURCHASE_CARDS_PATH}/${id}`)
                .toPromise();
            const prev = (0, class_transformer_1.plainToClass)(purchase_dto_1.CmsPurchaseDto, R.omit(['DynamicZone'], response.data));
            const parsedDynamicZone = response.data.DynamicZone.map((dynamicZonedata) => (0, class_transformer_1.plainToClass)(purchase_dto_1.DynamicZoneDto, dynamicZonedata));
            const result = Object.assign(Object.assign({}, prev), { DynamicZone: parsedDynamicZone });
            return result;
        }
        catch (err) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.NOT_EXIST);
        }
    }
    async getMarketTypesByMarketGroupId(marketGroupId) {
        try {
            const response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}/market-groups/${marketGroupId}`)
                .toPromise();
            const parsedResponseData = (0, class_transformer_1.plainToClass)(marketGroups_dto_1.MarketGroupByIdResponseDto, response.data);
            const result = parsedResponseData.marketTypesArray.map((el) => {
                const necessaryFields = R.pick(['id', 'Market_type', 'Type_id'], el);
                return (0, class_transformer_1.plainToClass)(marketGroups_dto_1.MarketTypeForFirestoreDto, necessaryFields);
            });
            return result;
        }
        catch (err) {
            throw new Error(`${err.message} occured during searching for marketTypes with marketGroupId ${marketGroupId} `);
        }
    }
    async getContestTemplates(templateId, contestType) {
        let response;
        try {
            response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_CONTEST_TEMPLATE_PATH}?templateId=${templateId}&contestType=${contestType}`)
                .toPromise();
        }
        catch (err) {
            console.error(err);
            throw new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.CMS_INTEGRATION_ERROR, err.message);
        }
        const contests = await Promise.allSettled(response.data.map(async (contestData) => {
            const result = (0, class_transformer_1.plainToClass)(contest_dto_1.CmsContestDto, contestData);
            const errors = await (0, class_validator_1.validate)(result);
            if (Array.isArray(errors) && errors.length > 0) {
                throw new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.CMS_INTEGRATION_ERROR, `Errors validating contest: ${JSON.stringify(errors)}`);
            }
            return { contestTemplate: result, originalData: contestData };
        }));
        const fulfilledContests = contests
            .reduce((acc, contest) => {
            if (contest.status === 'fulfilled' && contest.value) {
                return [...acc, contest.value];
            }
            return acc;
        }, []);
        return fulfilledContests;
    }
    async getContestTemplateById(id, contestType) {
        let response;
        try {
            response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_CONTEST_TEMPLATE_PATH}?id=${id}&contestType=${contestType}`)
                .toPromise();
        }
        catch (err) {
            throw new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.CMS_INTEGRATION_ERROR, err.message);
        }
        const contest = (0, class_transformer_1.plainToClass)(contest_dto_1.CmsContestDto, response.data);
        const errors = await (0, class_validator_1.validate)(contest);
        if (Array.isArray(errors) && errors.length > 0) {
            throw new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.CMS_INTEGRATION_ERROR, `Errors validating contest: ${JSON.stringify(errors)}`);
        }
        return {
            contestTemplate: contest,
            originalData: response.data,
        };
    }
    async getContestTemplateByCmsId(templateCmsId) {
        let response;
        try {
            response = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_CONTEST_TEMPLATE_PATH}?id=${templateCmsId}`)
                .toPromise();
        }
        catch (err) {
            throw new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.CMS_INTEGRATION_ERROR, err.message);
        }
        const contest = (0, class_transformer_1.plainToClass)(contest_dto_1.CmsContestDto, response.data);
        const errors = await (0, class_validator_1.validate)(contest);
        if (Array.isArray(errors) && errors.length > 0) {
            throw new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.CMS_INTEGRATION_ERROR, `Errors validating contest: ${JSON.stringify(errors)}`);
        }
        return {
            contestTemplate: contest,
            originalData: response.data,
        };
    }
    async getCmsOrder() {
        try {
            const cmsOrders = await this.httpService
                .get(`${config_1.default.CMS.CMS_BASE_URL}/home`)
                .toPromise();
            const topNavigation = cmsOrders.data.Top_navigation;
            const filteredTopNavigation = topNavigation.filter((el) => el.Display);
            const periodsArray = filteredTopNavigation
                .reduce((acc, cur) => {
                return cur['Periods'].length ? [...acc, cur.Periods] : acc;
            }, [])
                .flat();
            const result = periodsArray.reduce((acc, cur) => {
                const { Periods_group_name: periodName } = cur;
                const { Period } = cur;
                const { period_id: periodId } = Period;
                return acc[periodId]
                    ? acc
                    : Object.assign(Object.assign({}, acc), { [periodId]: {
                            periodName,
                            periodId,
                            count: 0,
                            contestInstances: [],
                            contests: cur.Contests,
                        } });
            }, {});
            return result;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async isMarketTypeInContestTemplateFetch(cmsContestTemplateId, typeId, period) {
        const response = await this.httpService
            .get(`${config_1.default.CMS.CMS_BASE_URL}/contest-templates/${cmsContestTemplateId}/market-types/${typeId}/period/${period}`)
            .toPromise();
        return response.data;
    }
    async isPublishedPurchase(purchaseCardId) {
        const queryResponse = await this.httpService
            .get(`${config_1.default.CMS.CMS_BASE_URL}${config_1.default.CMS.CMS_PURCHASES_PATH}`)
            .toPromise();
        const { Purchases_order: purchasesOrder } = queryResponse.data;
        const { purchase_cards: purchaseCards } = purchasesOrder;
        return purchaseCards.some((el) => el.id === purchaseCardId);
    }
};
CmsService = CmsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CmsService);
exports.CmsService = CmsService;
//# sourceMappingURL=cms.service.js.map