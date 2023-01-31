"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFirebaseDynamicLinksClient = void 0;
const firebase_dynamic_links_1 = require("firebase-dynamic-links");
function createFirebaseDynamicLinksClient(options) {
    const client = new firebase_dynamic_links_1.FirebaseDynamicLinks(options.webApiKey);
    return client;
}
exports.createFirebaseDynamicLinksClient = createFirebaseDynamicLinksClient;
//# sourceMappingURL=dynamic-links.util.js.map