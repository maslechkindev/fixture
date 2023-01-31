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
exports.FacebookAPIService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("../../../../../config");
const errors_1 = require("../../../../../helpers/errors");
const { FB_DEBUG_EP, FB_ACCESS_TOKEN, FB_GRAPH_EP, FB_APP_ID } = config_1.default.SSO.FACEBOOK;
let FacebookAPIService = class FacebookAPIService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async validateAccessToken(access_token) {
        const params = new URLSearchParams();
        params.append('input_token', access_token);
        params.append('access_token', FB_ACCESS_TOKEN);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            },
            params,
        };
        const { data: responseData, } = await this.httpService.get(FB_DEBUG_EP, config).toPromise();
        if (responseData.error) {
            throw new errors_1.UnauthorizedExceptionCustom(Object.assign(Object.assign({}, errors_1.ERRORS.FACEBOOK_SPECIFIC.TOKEN_VALIDATION_FAILED), { info: { responseError: JSON.stringify(responseData.error) } }));
        }
        if (responseData.data.app_id !== FB_APP_ID ||
            responseData.data.is_valid !== true ||
            responseData.data.type !== 'USER' ||
            responseData.data.expires_at < Math.floor(Date.now() / 1000)) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.FACEBOOK_SPECIFIC.TOKEN_VALIDATION_FAILED);
        }
        return responseData.data;
    }
    async getUserInfoWithToken(access_token) {
        const params = new URLSearchParams();
        params.append('fields', 'id, email, first_name, last_name');
        params.append('access_token', access_token);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            },
            params,
        };
        const { data: responseData } = await this.httpService.get(FB_GRAPH_EP, config).toPromise();
        if (responseData.error) {
            throw new Error(JSON.stringify(responseData.error));
        }
        return responseData;
    }
};
FacebookAPIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], FacebookAPIService);
exports.FacebookAPIService = FacebookAPIService;
//# sourceMappingURL=facebook-api.service.js.map