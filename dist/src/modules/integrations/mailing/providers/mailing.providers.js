"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMailingProviders = void 0;
const mailing_constants_1 = require("../common/mailing.constants");
const mailing_util_1 = require("../common/mailing.util");
function createMailingProviders(options) {
    return {
        provide: mailing_constants_1.MAILING_TOKEN,
        useValue: (0, mailing_util_1.createMailingClient)(options),
    };
}
exports.createMailingProviders = createMailingProviders;
//# sourceMappingURL=mailing.providers.js.map