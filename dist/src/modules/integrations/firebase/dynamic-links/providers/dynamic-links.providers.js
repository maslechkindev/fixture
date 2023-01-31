"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFirebaseDynamicLinksProviders = void 0;
const dynamic_links_constants_1 = require("../common/dynamic-links.constants");
const dynamic_links_util_1 = require("../common/dynamic-links.util");
function createFirebaseDynamicLinksProviders(options) {
    return {
        provide: dynamic_links_constants_1.FIREBASE_DYNAMIC_LINKS_TOKEN,
        useValue: (0, dynamic_links_util_1.createFirebaseDynamicLinksClient)(options),
    };
}
exports.createFirebaseDynamicLinksProviders = createFirebaseDynamicLinksProviders;
//# sourceMappingURL=dynamic-links.providers.js.map