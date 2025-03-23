import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [AiModule, DecksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
