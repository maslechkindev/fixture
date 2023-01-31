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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../../../../../../helpers/auth");
const entry_service_1 = require("../../entry.service");
const user_interface_1 = require("../../../../../../interfaces/user.interface");
const login_repository_1 = require("./login.repository");
let LoginService = class LoginService {
    constructor(entryService, loginRepository) {
        this.entryService = entryService;
        this.loginRepository = loginRepository;
    }
    async checkPassword(password, user) {
        const { passwordHash, salt } = user;
        const isCorrect = await (0, auth_1.verify)(password, passwordHash, salt);
        return isCorrect;
    }
    updateFirstLoginField(userId) {
        return this.loginRepository.updateFirstLoginField(userId);
    }
    async verifyLoginAttempts(userId) {
        const currentAttempts = await this.loginRepository.incrementLoginAttempts(userId);
        return currentAttempts >= 5;
    }
    async isManualLoginDisabled(userId) {
        const currentData = await this.loginRepository.currentLoginAttempts(userId);
        return currentData && currentData.attempts >= 5;
    }
    async resetLoginAttempts(userId) {
        await this.loginRepository.setLoginAttempts(userId, 0);
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        login_repository_1.LoginRepository])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map