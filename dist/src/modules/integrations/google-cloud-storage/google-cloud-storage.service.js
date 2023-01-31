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
var GoogleCloudStorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCloudStorageService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
const config_1 = require("../../../config");
class StorageFile {
}
let GoogleCloudStorageService = GoogleCloudStorageService_1 = class GoogleCloudStorageService {
    constructor() {
        this.logger = new common_1.Logger(GoogleCloudStorageService_1.name);
        this.storage = new storage_1.Storage({
            projectId: config_1.default.GOOGLE_CLOUD_STORAGE.PROJECT_ID,
            credentials: config_1.default.GOOGLE_CLOUD_STORAGE.CREDENTIALS,
        });
        this.bucket = config_1.default.GOOGLE_CLOUD_STORAGE.BUCKET;
    }
    async save(path, contentType, media, metadata) {
        const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
        const file = this.storage.bucket(this.bucket).file(path);
        const stream = file.createWriteStream();
        return new Promise((resolve, reject) => {
            stream.on('finish', async () => {
                await file.setMetadata({
                    metadata: object,
                });
                resolve();
            });
            stream.on('error', (err) => {
                reject(err);
            });
            stream.end(media);
        });
    }
    async get(path) {
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map();
        return storageFile;
    }
};
GoogleCloudStorageService = GoogleCloudStorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleCloudStorageService);
exports.GoogleCloudStorageService = GoogleCloudStorageService;
//# sourceMappingURL=google-cloud-storage.service.js.map