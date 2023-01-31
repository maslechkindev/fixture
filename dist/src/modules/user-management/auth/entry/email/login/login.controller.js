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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../../../helpers/swagger/decorators");
const firebase_auth_service_1 = require("../../../firebase/firebase.auth.service");
const entry_service_1 = require("../../entry.service");
const login_service_1 = require("./login.service");
const login_dto_1 = require("./dto/login.dto");
const userStatus_1 = require("../../../../../../enums/userStatus");
const errors_1 = require("../../../../../../helpers/errors");
let LoginController = class LoginController {
    constructor(entryService, loginService, firebaseAuthService) {
        this.entryService = entryService;
        this.loginService = loginService;
        this.firebaseAuthService = firebaseAuthService;
    }
    async login(loginUserDto) {
        const user = await this.entryService.getUserByEmail(loginUserDto.email);
        if (!user || !user.salt) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.INVALID_CREDENTIALS);
        }
        if (user.status !== userStatus_1.userStatus.CONFIRMED) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.ACCOUNT_NOT_CONFIRMED);
        }
        const isManualLoginDisabled = await this.loginService.isManualLoginDisabled(user.id);
        if (isManualLoginDisabled) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.MANUAL_LOGIN_DISABLED);
        }
        const isPasswordCorrect = await this.loginService.checkPassword(loginUserDto.password, user);
        if (!isPasswordCorrect) {
            const isDisabled = await this.loginService.verifyLoginAttempts(user.id);
            if (isDisabled) {
                throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.MANUAL_LOGIN_DISABLED);
            }
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.INVALID_CREDENTIALS);
        }
        const isUserBanned = await this.entryService.isUserBanned(user.id);
        if (isUserBanned) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_BANNED);
        }
        await this.loginService.resetLoginAttempts(user.id);
        const customToken = await this.firebaseAuthService.issueCustomToken(user.id);
        if (!user.firstLoginPassed) {
            await this.loginService.updateFirstLoginField(user.id);
        }
        return {
            email: loginUserDto.email,
            customToken,
        };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        schema: {
            example: {
                email: 'test@test.com',
                customToken: 'jwt.firebase.custom.token',
            },
        },
        description: 'Success manual login. Returns the login token',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PASSWORD_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_BANNED).getResponse(),
                },
            ],
        },
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.ACCOUNT_NOT_CONFIRMED).getResponse(),
                },
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.INVALID_CREDENTIALS).getResponse(),
                },
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.MANUAL_LOGIN_DISABLED).getResponse(),
                },
            ],
        },
        description: 'Account not confirmed, incorrect credentials or manual login disabled',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    (0, decorators_1.ApiTags)('Login'),
    (0, common_1.Controller)('auth/login'),
    __param(2, (0, common_1.Inject)(firebase_auth_service_1.FirebaseAuthService)),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        login_service_1.LoginService,
        firebase_auth_service_1.FirebaseAuthService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map