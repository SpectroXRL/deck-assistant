class Background{
    color: string;

    gradient: string;
}

class Image{
    shortQuery: string;

    fullDescription: string;

    originalUrl: string;

    storedPath: string;

    selectedAt: string;
}

class TextBlock{
    id: number;

    text: string;

    type: string;
}

class Content{
    textBlocks: TextBlock[];

    image: Image;

    notes: string;
}

class Slide{
    id: number;

    title: string;

    type: string;

    content: Content;

    background: Background;
}

export class Slides{
    deckId: string;

    slideGroup: Slide[]
}