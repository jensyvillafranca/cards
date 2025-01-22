import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Configuración básica de Swagger
   const config = new DocumentBuilder()
   .setTitle('Documentación Cards')
   .setDescription('Esta es la documentación del backend para aplicación CRUD de tarjetas')
   .setVersion('1.0')
   .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
