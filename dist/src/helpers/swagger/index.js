"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../../config");
const servers = [
    'https://dev.sportinghood.com/backend',
    'https://uat.sportinghood.com/backend',
    'https://stage.sportinghood.com/backend',
    'http://localhost:3000',
];
const version = config_1.default.VERSION;
exports.default = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Spaction')
        .setDescription('The Spaction API description')
        .addBearerAuth()
        .setVersion(version);
    const serversAppliedConfig = servers.reduce((acc, server) => acc.addServer(server), config);
    const builtConfig = serversAppliedConfig.build();
    const document = swagger_1.SwaggerModule.createDocument(app, builtConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
};
//# sourceMappingURL=index.js.map