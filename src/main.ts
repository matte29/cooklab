import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = new Logger('bootstrap');

    const PORT = 3000;
    await app.listen(PORT);

    logger.log('Application Listening on Port: ' + PORT);
}
bootstrap();
