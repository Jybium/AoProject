import { NestFactory } from '@nestjs/core';
import helmet from "helmet"
const expressCsrf = require('express-csrf-protect');
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.enableCors()
  app.use(expressCsrf.enable({httpOnly: true}))
  const config = new DocumentBuilder()
    .setTitle('AoProject')
    .setDescription('The AoProject API Documentation')
    .setVersion('1.0')
    .addTag("project", 'Agile scrum methodology' )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3004);
}
bootstrap();
