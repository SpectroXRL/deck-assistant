import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateDeckDTO } from './dtos/generate-deck-dto';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService){}

    @Post('generate-deck')
    generateDeck(@Body() body: GenerateDeckDTO){
        const generatedContent = this.aiService.generateDeckContent(body);
        return generatedContent;
    }
}
