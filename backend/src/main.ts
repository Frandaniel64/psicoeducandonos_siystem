import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Prefijo Global (Todas las rutas iniciarán en /api)
  app.setGlobalPrefix('api');

  // 2. Habilitar Versionamiento (Ej. /api/v1/auth)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Habilitar CORS para que el Frontend Angular se pueda conectar sin bloqueos
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
