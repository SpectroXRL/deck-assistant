import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configure CORS for local development
   app.enableCors({
    origin: 'http://localhost:5173', // Specific origin of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    credentials: true, // If you need to send cookies or auth headers
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
