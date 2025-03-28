import { Module } from '@nestjs/common';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { DecksRepository } from './repositories/decks.repository';
import { SlidesRepository } from './repositories/slides.repository';

@Module({
  controllers: [DecksController],
  providers: [DecksService, DecksRepository, SlidesRepository]
})
export class DecksModule {}
