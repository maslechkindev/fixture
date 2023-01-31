"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMailing = void 0;
const common_1 = require("@nestjs/common");
const mailing_constants_1 = require("./mailing.constants");
function InjectMailing() {
    return (0, common_1.Inject)(mailing_constants_1.MAILING_TOKEN);
}
exports.InjectMailing = InjectMailing;
//# sourceMappingURL=mailing.decorator.js.map