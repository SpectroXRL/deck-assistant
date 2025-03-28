import {readFile, writeFile} from 'fs/promises';
import { Deck } from '../models/deck';
import { CreateDeckDto } from '../dtos/create-deck-dto';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DecksRepository{
    async get(id: string){
        const contents = await readFile('decks.json', 'utf-8');
        const decks: Deck[] =  JSON.parse(contents);

        return decks.filter(deck => deck.id == id);
    }

    async getAll(){
        const contents = await readFile('decks.json', 'utf-8');
        const decks: Deck[] =  JSON.parse(contents);

        return decks;
    }

    async create(deckDetails: CreateDeckDto)
    {
        const contents = await readFile('decks.json', 'utf-8');
        const decks: Deck[] =  JSON.parse(contents);

        const id = uuidv4();
        const deck: Deck = {id: id, ...deckDetails}

        decks.push(deck);
        await writeFile('decks.json', JSON.stringify(decks));
    }
}