import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dtos/create-deck-dto';
import { CreateSlidesDeckDto } from './dtos/create-slides-dto';

@Controller('decks')
export class DecksController {

    constructor(public decksService: DecksService){};

    @Get()
    getAllDecks(){
        return this.decksService.getAllDecks();
    }

    @Get("/:id")
    async getDeck(@Param('id') id: string){
        const deck = await this.decksService.getDeck(id);

        if(!deck){
            throw new NotFoundException('deck not found');
        }

        return deck;
    }

    @Post("/")
    createDeck(@Body() body: CreateDeckDto){
        return this.decksService.createDeck(body);
    }

    @Get("/:deckId/slides")
    getAllSlides(@Param('deckId') deckId: string){
        return this.decksService.getAllSlides(deckId);
    }

    @Get("/:deckId/slides/:slideId")
    async getSlide(@Param('deckId') deckId: string, @Param('slideId') slideId: number){
        const slide = await this.decksService.getSlide(deckId, slideId);

        if(!slide){
            throw new NotFoundException('deck not found');
        }

        return slide;
    }

    @Post("/:deckId")
    createSlide(@Body() body: CreateSlidesDeckDto){
        return this.decksService.createSlides(body);
    }
}
