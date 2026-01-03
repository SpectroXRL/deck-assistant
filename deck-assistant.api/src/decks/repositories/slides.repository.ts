import {readFile, writeFile} from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { Slides } from '../models/slides';
import { CreateSlidesDeckDto } from '../dtos/create-slides-dto';

@Injectable()
export class SlidesRepository{
    async get(deckId: string, id: number){
        const contents = await readFile('slides.json', 'utf-8');
        const slidesArr: Slides[] =  JSON.parse(contents);

        const slides: Slides = slidesArr.find(slideGroup => slideGroup.deckId == deckId) as Slides;

        if (!slides) {
            throw new Error(`No deck found with ID: ${deckId}`);
        }

        const slide = slides.slideGroup.find(slide => slide.id == id);

        if (!slide) {
            throw new Error(`No slide found with ID: ${id} in deck ${deckId}`);
        }

        return slide;
    }

    async getAll(deckId: string){
        const contents = await readFile('slides.json', 'utf-8');
        const slidesArr: Slides[] =  JSON.parse(contents);

        const slides: Slides = slidesArr.find(slideGroup => slideGroup.deckId == deckId) as Slides;


        return slides;
    }

    async create(slidesDetails: CreateSlidesDeckDto)
    {
        const contents = await readFile('slides.json', 'utf-8');
        const slidesArr: Slides[] =  JSON.parse(contents);

        const slides: Slides = slidesDetails;

        slidesArr.push(slides);
        await writeFile('slides.json', JSON.stringify(slidesArr));
    }

    async updateTextBlock(deckId: string, slideId: number, textBlockId: number, text: string) {
        const contents = await readFile('slides.json', 'utf-8');
        const slidesArr: Slides[] = JSON.parse(contents);

        const deckSlides = slidesArr.find(s => s.deckId === deckId);
        if (!deckSlides) {
            throw new Error(`Deck not found with ID: ${deckId}`);
        }

        const slide = deckSlides.slideGroup.find(s => s.id === slideId);
        if (!slide) {
            throw new Error(`Slide not found with ID: ${slideId}`);
        }

        const textBlock = slide.content.textBlocks.find(tb => tb.id === textBlockId);
        if (!textBlock) {
            throw new Error(`TextBlock not found with ID: ${textBlockId}`);
        }

        textBlock.text = text;

        await writeFile('slides.json', JSON.stringify(slidesArr, null, 2));
        return slide;
    }

    async updateSpeakerNotes(deckId: string, slideId: number, notes: string) {
        const contents = await readFile('slides.json', 'utf-8');
        const slidesArr: Slides[] = JSON.parse(contents);

        const deckSlides = slidesArr.find(s => s.deckId === deckId);
        if (!deckSlides) {
            throw new Error(`Deck not found with ID: ${deckId}`);
        }

        const slide = deckSlides.slideGroup.find(s => s.id === slideId);
        if (!slide) {
            throw new Error(`Slide not found with ID: ${slideId}`);
        }

        slide.content.notes = notes;

        await writeFile('slides.json', JSON.stringify(slidesArr, null, 2));
        return slide;
    }
}