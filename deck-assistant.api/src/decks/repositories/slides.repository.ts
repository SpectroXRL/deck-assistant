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
}