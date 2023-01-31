"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubHandler = void 0;
const common_1 = require("@nestjs/common");
const gcp_pubsub_constants_1 = require("../gcp-pubsub.constants");
const PubsubHandler = (config) => {
    return (0, common_1.SetMetadata)(gcp_pubsub_constants_1.GCP_PUBSUB_HANDLER, config);
};
exports.PubsubHandler = PubsubHandler;
//# sourceMappingURL=pubsub-handler.decorator.js.map