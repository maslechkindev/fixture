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
exports.FacebookSSOController = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const config_1 = require("../../../../../config");
const decorators_1 = require("../../../../../helpers/swagger/decorators");
const entry_service_1 = require("../entry.service");
const account_confirmation_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation.service");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
const facebook_service_1 = require("./facebook.service");
const entry_dto_1 = require("./dto/entry.dto");
const infoScope_dto_1 = require("./dto/infoScope.dto");
const tokenVerificationResponse_dto_1 = require("./dto/tokenVerificationResponse.dto");
const entryResponse_dto_1 = require("./dto/entryResponse.dto");
const errors_1 = require("../../../../../helpers/errors");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const entry_helpers_1 = require("../helpers/entry.helpers");
const registrationSubType_1 = require("../../../../../enums/registrationSubType");
const entry_maps_1 = require("../entry.maps");
let FacebookSSOController = class FacebookSSOController {
    constructor(entryService, accountConfirmationService, facebookSSOService, firebaseAuthService) {
        this.entryService = entryService;
        this.accountConfirmationService = accountConfirmationService;
        this.facebookSSOService = facebookSSOService;
        this.firebaseAuthService = firebaseAuthService;
    }
    async entry(req, body) {
        var _a, _b;
        const { email: fbEmail, id, first_name: firstName, last_name: lastName, } = await this.facebookSSOService.getInfoFromIdToken(body.access_token);
        const user = await this.facebookSSOService.retrieveExistingUser(id);
        if (user) {
            const isUserBanned = await this.entryService.isUserBanned(user.id);
            if (isUserBanned) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_BANNED);
            }
            const result = {
                email: user.email,
                customToken: null,
                registrationType: registrationSubType_1.registrationSubType.FACEBOOK,
            };
            if (this.entryService.userConfirmed(user)) {
                result.customToken = await this.firebaseAuthService.issueCustomToken(user.id);
            }
            req.res.status(common_1.HttpStatus.OK);
            return result;
        }
        let email;
        let emailFromToken;
        if (fbEmail) {
            email = fbEmail;
            emailFromToken = true;
        }
        else {
            email = body.email;
            emailFromToken = false;
        }
        if (!email) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_NOT_DERIVED);
        }
        if (!id) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PLATFORM_ID_NOT_DERIVED);
        }
        if (!body.dateOfBirth) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_DATE);
        }
        if (!body.country) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_COUNTRY);
        }
        if (!body.state) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_STATE);
        }
        const date = new Date();
        const parsedDateOfBirthWithTZ = (0, date_fns_1.parse)(body.dateOfBirth, 'MM/dd/yyyy', date);
        const parsedDateOfBirth = (0, date_fns_1.add)(parsedDateOfBirthWithTZ, {
            minutes: -date.getTimezoneOffset(),
        });
        const userAge = (0, date_fns_1.differenceInYears)(new Date(), parsedDateOfBirth);
        if (userAge < 18) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_DATE);
        }
        if (!((_b = (_a = entry_maps_1.userLocation === null || entry_maps_1.userLocation === void 0 ? void 0 : entry_maps_1.userLocation[body.country]) === null || _a === void 0 ? void 0 : _a[body.state]) === null || _b === void 0 ? void 0 : _b.allowed)) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_STATE);
        }
        if (body.code) {
            const isValid = await this.entryService.isValidReferralCode(body.code);
            if (!isValid) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE);
            }
        }
        const presettedData = {};
        if ((0, entry_helpers_1.isValidName)(firstName))
            presettedData.firstName = firstName;
        if ((0, entry_helpers_1.isValidName)(lastName))
            presettedData.lastName = lastName;
        presettedData.dateOfBirth = parsedDateOfBirth;
        presettedData.country = body.country;
        presettedData.state = body.state;
        await this.facebookSSOService.createUser(email, emailFromToken, id, body.code, presettedData);
        const token = await this.accountConfirmationService.createAndSetEmailVerificationToken(email);
        await this.accountConfirmationService.sendConfirmationEmail(email, token, config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL
            .ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID);
        req.res.status(common_1.HttpStatus.CREATED);
        return {
            email,
            customToken: null,
            registrationType: registrationSubType_1.registrationSubType.FACEBOOK,
        };
    }
    async verify(body) {
        const { id, email } = await this.facebookSSOService.getInfoFromIdToken(body.access_token);
        const platformAccount = await this.facebookSSOService.getFacebookAccount(id);
        if (platformAccount) {
            return {
                code: tokenVerificationResponse_dto_1.ResponseCode.NONE,
            };
        }
        if (!email) {
            return {
                code: tokenVerificationResponse_dto_1.ResponseCode.GET_CODE_EMAIL,
            };
        }
        const isEmailUsed = await this.entryService.getUserByEmail(email);
        if (isEmailUsed) {
            return {
                code: tokenVerificationResponse_dto_1.ResponseCode.USER_EXISTS,
            };
        }
        return {
            code: tokenVerificationResponse_dto_1.ResponseCode.GET_CODE,
        };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: entryResponse_dto_1.WrappedEntryResponseDTO,
        description: 'Existing user retrieved',
    }),
    (0, decorators_1.ApiCreatedResponse)({
        type: entryResponse_dto_1.WrappedEntryResponseDTO,
        description: 'User created',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_NOT_DERIVED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PLATFORM_ID_NOT_DERIVED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_USED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PLATFORM_TOKEN_EMPTY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FACEBOOK_SPECIFIC.TOKEN_VALIDATION_FAILED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_BANNED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_DATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_DATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_STATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_COUNTRY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_STATE).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Post)('/entry'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, entry_dto_1.FacebookEntryDto]),
    __metadata("design:returntype", Promise)
], FacebookSSOController.prototype, "entry", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        description: 'Additional info required',
        type: tokenVerificationResponse_dto_1.WrappedTokenVerificationGetDTO,
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PLATFORM_TOKEN_EMPTY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FACEBOOK_SPECIFIC.TOKEN_VALIDATION_FAILED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/verify/token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [infoScope_dto_1.InfoScopeDTO]),
    __metadata("design:returntype", Promise)
], FacebookSSOController.prototype, "verify", null);
FacebookSSOController = __decorate([
    (0, decorators_1.ApiTags)('SSO Facebook'),
    (0, common_1.Controller)('auth/sso/facebook'),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        account_confirmation_service_1.AccountConfirmationService,
        facebook_service_1.FacebookSSOService,
        firebase_auth_service_1.FirebaseAuthService])
], FacebookSSOController);
exports.FacebookSSOController = FacebookSSOController;
//# sourceMappingURL=facebook.controller.js.map