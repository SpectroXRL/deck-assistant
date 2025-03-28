import { Injectable } from '@nestjs/common';
import { DecksRepository } from './repositories/decks.repository';
import { CreateDeckDto } from './dtos/create-deck-dto';
import { SlidesRepository } from './repositories/slides.repository';
import { CreateSlidesDeckDto } from './dtos/create-slides-dto';

@Injectable()
export class DecksService {
    constructor(public decksRepo: DecksRepository, public slidesRepo: SlidesRepository){};

    getDeck(id: string){
        return this.decksRepo.get(id);
    }

    getAllDecks(){
        return this.decksRepo.getAll();
    }

    createDeck(deckDetails: CreateDeckDto){
        return this.decksRepo.create(deckDetails);
    }

    getSlide(deckId: string, id: number){
        return this.slidesRepo.get(deckId, id);
    }

    getAllSlides(deckId: string){
        return this.slidesRepo.getAll(deckId);
    }

    createSlides(slidesDetails: CreateSlidesDeckDto){
        return this.slidesRepo.create(slidesDetails);
    }
}
