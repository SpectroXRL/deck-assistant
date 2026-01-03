import { Body, Controller, Get, NotFoundException, Param, Post, Patch } from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dtos/create-deck-dto';
import { CreateSlidesDeckDto } from './dtos/create-slides-dto';
import { UpdateTextBlockDto } from './dtos/update-textblock-dto';
import { UpdateSpeakerNotesDto } from './dtos/update-speaker-notes-dto';

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

    @Patch("/:deckId/slides/:slideId/textblocks/:textBlockId")
    updateTextBlock(
        @Param('deckId') deckId: string,
        @Param('slideId') slideId: number,
        @Param('textBlockId') textBlockId: number,
        @Body() body: UpdateTextBlockDto
    ) {
        return this.decksService.updateTextBlock(deckId, slideId, textBlockId, body.text);
    }

    @Patch("/:deckId/slides/:slideId/notes")
    updateSpeakerNotes(
        @Param('deckId') deckId: string,
        @Param('slideId') slideId: number,
        @Body() body: UpdateSpeakerNotesDto
    ) {
        return this.decksService.updateSpeakerNotes(deckId, slideId, body.notes);
    }
}
