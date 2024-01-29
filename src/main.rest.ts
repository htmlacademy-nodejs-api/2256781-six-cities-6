import { PinoLogger } from './shared/libs/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(process.env);
  console.log(config.get('PORT'));

  const application = new RestApplication(logger);
  await application.init();
}

bootstrap();
