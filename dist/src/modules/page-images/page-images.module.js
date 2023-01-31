"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageImagesModule = void 0;
const common_1 = require("@nestjs/common");
const page_images_service_1 = require("./page-images.service");
const page_images_controller_1 = require("./page-images.controller");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const contest_instance_module_1 = require("../contest-instance/contest-instance.module");
const winners_rewarding_module_1 = require("../contest-instance/winners-rewarding/winners-rewarding.module");
const google_cloud_storage_service_1 = require("../integrations/google-cloud-storage/google-cloud-storage.service");
let PageImagesModule = class PageImagesModule {
};
PageImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [contest_instance_module_1.ContestInstanceModule, winners_rewarding_module_1.WinnersRewardingModule],
        controllers: [page_images_controller_1.PageImagesController],
        providers: [
            page_images_service_1.PageImagesService,
            contest_instance_service_1.ContestInstanceService,
            google_cloud_storage_service_1.GoogleCloudStorageService,
        ],
    })
], PageImagesModule);
exports.PageImagesModule = PageImagesModule;
//# sourceMappingURL=page-images.module.js.map