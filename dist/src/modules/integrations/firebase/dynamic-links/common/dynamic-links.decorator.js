"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectFirebaseDynamicLinks = void 0;
const common_1 = require("@nestjs/common");
const dynamic_links_constants_1 = require("./dynamic-links.constants");
function InjectFirebaseDynamicLinks() {
    return (0, common_1.Inject)(dynamic_links_constants_1.FIREBASE_DYNAMIC_LINKS_TOKEN);
}
exports.InjectFirebaseDynamicLinks = InjectFirebaseDynamicLinks;
//# sourceMappingURL=dynamic-links.decorator.js.map