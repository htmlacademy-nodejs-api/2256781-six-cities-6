import { PinoLogger } from './shared/libs/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);

  const application = new RestApplication(logger, config);
  await application.init();
}

bootstrap();
