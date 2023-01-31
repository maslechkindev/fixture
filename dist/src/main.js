"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const swagger_1 = require("./helpers/swagger");
const logger_1 = require("./helpers/logger");
const config_1 = require("./config");
const module_interface_1 = require("./interfaces/common/module.interface");
const app_module_1 = require("./app.module");
const exceptionFactory_1 = require("./helpers/exceptionFactory");
const sentry_service_1 = require("./modules/integrations/sentry/sentry.service");
require("@sentry/tracing");
const types_1 = require("@sentry/types");
const pkgJSON = require("../package.json");
const sentryOptions = {
    dsn: config_1.default.SENTRY.DSN,
    debug: config_1.default.SENTRY.DEBUG,
    release: pkgJSON.version,
    environment: config_1.default.SERVICE_ENV,
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: config_1.default.SENTRY.ON
            ? sentry_service_1.SentryLoggerService.SentryServiceInstance(Object.assign(Object.assign({}, sentryOptions), { logLevels: [types_1.Severity.Error] }))
            : new logger_1.default(),
    });
    app.use((0, helmet_1.default)());
    (0, swagger_1.default)(app);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ exceptionFactory: exceptionFactory_1.exceptionFactory }));
    app.enableShutdownHooks();
    await app.listen(config_1.default.API.PORT);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map