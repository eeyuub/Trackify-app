import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Important: Configure static file serving
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: configService.get('STATIC_ASSETS_PREFIX') || '/local',   // This matches your URL path
    index: false,         // Disable directory listing
  });

  app.enableCors({
    origin: configService.get('FRONTEND_URL'), // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();

