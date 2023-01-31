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
exports.RewardsService = void 0;
const common_1 = require("@nestjs/common");
const rewards_repository_1 = require("./rewards.repository");
let RewardsService = class RewardsService {
    constructor(rewardsRepository) {
        this.rewardsRepository = rewardsRepository;
    }
    async getRewards() {
        return this.rewardsRepository.getRewards();
    }
    async updateRewards(rewards) {
        return this.rewardsRepository.updateRewards(rewards);
    }
};
RewardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rewards_repository_1.RewardsRepository])
], RewardsService);
exports.RewardsService = RewardsService;
//# sourceMappingURL=rewards.service.js.map