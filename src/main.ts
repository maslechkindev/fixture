import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import swagger from 'helpers/swagger';
import Logger from 'helpers/logger';
import config from 'config';
import { ModuleInterface } from 'interfaces/common/module.interface';

import { AppModule } from './app.module';
import { exceptionFactory } from './helpers/exceptionFactory';
import { SentryLoggerService } from './modules/integrations/sentry/sentry.service';
import '@sentry/tracing';
import { Severity } from '@sentry/types';

import * as pkgJSON from '../package.json';

declare const module: ModuleInterface;

const sentryOptions = {
  dsn: config.SENTRY.DSN,
  debug: config.SENTRY.DEBUG,
  release: pkgJSON.version,
  environment: config.SERVICE_ENV,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: config.SENTRY.ON
      ? SentryLoggerService.SentryServiceInstance({
          ...sentryOptions,
          logLevels: [Severity.Error],
        })
      : new Logger(),
  });
  app.use(helmet());
  swagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }));
  app.enableShutdownHooks();
  await app.listen(config.API.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
