import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { DecksModule } from './decks/decks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AiModule, DecksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
