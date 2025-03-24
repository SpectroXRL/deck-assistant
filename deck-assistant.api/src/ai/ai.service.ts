import { Injectable } from '@nestjs/common';
import { GenerateDeckDTO } from './dtos/generate-deck-dto';
import { GenerationConfig, GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";

@Injectable()
export class AiService {
    private readonly genAI : GoogleGenerativeAI;

    constructor(){
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    }

    async generateDeckContent(dto: GenerateDeckDTO){

        const schema = this.buildSchema();

        const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash", 
            generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
          }, });

        const prompt = this.buildPrompt(dto);

        const result = await model.generateContent(prompt);

        //console.log(result.response.text());
        return result.response.text();
    }

    private buildPrompt(dto: GenerateDeckDTO){
        const builtPrompt = `
        Generate a pitch deck for the following company:
        Company Name: ${dto.companyName}
        Industry: ${dto.industry}
        Problem Statement: ${dto.problemStatement}
        Solution: ${dto.solution}
        Business Model: ${dto.businessModel}
        Financial Highlights: ${dto.financials}
        Team Information: ${dto.teamInfo}
        
        Create a structured pitch deck with the following slides:
        1. Title slide with company name and tagline
        2. Problem slide describing the pain point
        3. Solution slide explaining the product/service
        4. Market slide with target audience and market size
        5. Business Model slide
        6. Financial Projections slide
        7. Team slide highlighting key members
        8. Contact slide with call to action
        
        For each slide, provide:
        - A clear title
        - Bullet points or paragraphs for the main content
        - Suggested image description (what kind of image would work well)
        - Speaker notes to guide presentation
        `;
        return builtPrompt;
    }

    private buildSchema(){
        const schema = {
            description: "A list of slides for a pitch deck for a company",
            type: SchemaType.OBJECT,
            properties: {
                title: {
                    type: SchemaType.STRING,
                    description: "Title of the entire pitch deck presentation",
                    nullable: false
                },
                slides: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            id: {
                                type: SchemaType.STRING,
                                description: "starting from 'slide1' will increase by 1 based on when added",
                                nullable: false
                            },
                            title: {
                                type: SchemaType.STRING,
                                description: "title of specific slide",
                                nullable: false
                            },
                            type: {
                                type: SchemaType.STRING,
                                description: "type of slide",
                                enum: ["title", "problem", "solution"],
                                format: "enum",
                                nullable: false
                            },
                            content: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    textBlocks: {
                                        type: SchemaType.ARRAY,
                                        items: {
                                            type: SchemaType.OBJECT,
                                            properties: {
                                                id: {
                                                    type: SchemaType.STRING,
                                                    description: "starting from 'text1' will increase by 1 based on when added",
                                                    nullable: false
                                                },
                                                text: {
                                                    type:SchemaType.STRING,
                                                    description: "information content of the relevant slide",
                                                    nullable: false
                                                },
                                                type: {
                                                    type: SchemaType.STRING,
                                                    description: "type of text block",
                                                    enum: ["heading", "subheading", "paragraph", "bullet"],
                                                    format: "enum",
                                                    nullable: false}
                                            },
                                            required: ["id", "text", "type"],
                                            propertyOrdering: ["id", "text", "type"],
                                            nullable: false
                                        }
                                    },
                                    image: {
                                        type: SchemaType.OBJECT,
                                        properties: {
                                            shortQuery: {
                                                type: SchemaType.STRING,
                                                description: "Short, search-friemdly image query relevant to the slide.",
                                                nullable: false
                                            },
                                            fullDescription: {
                                                type: SchemaType.STRING,
                                                description: "Detailed description of appropriate image for this slide.",
                                                nullable: false
                                            },
                                            originalUrl: {
                                                type: SchemaType.STRING,
                                                description: "leave blank",
                                                nullable: true
                                            },
                                            storedPath: {
                                                type: SchemaType.STRING,
                                                description: "leave blank",
                                                nullable: true
                                            },
                                            selectedAt: {
                                                type: SchemaType.STRING,
                                                description: "leave blank",
                                                nullable: true
                                            }
                                        },
                                        required: ["shortQuery", "fullDescription", "originalUrl", "storedPath", "selectedAt"],
                                        propertyOrdering: ["shortQuery", "fullDescription", "originalUrl", "storedPath", "selectedAt"],
                                        nullable: false
                                    },
                                    notes: {
                                        type: SchemaType.STRING,
                                        description: "Speaker notes for respective slide",
                                        nullable: false
                                    }
                                },
                                required: ["textBlocks", "image", "notes"],
                                propertyOrdering: ["textBlocks", "image", "notes"],
                                nullable: false
                            },// end of content object
                            background: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    color: {
                                        type: SchemaType.STRING,
                                        description: "Background color in the hex format (e.g., #FFFFFF). suggest appropriate background colors that match the tone and content of each slide",
                                        nullable: false
                                    },
                                    gradient: {
                                        type: SchemaType.STRING,
                                        description: "CSS gradient value if applicable. suggest appropriate background colors that match the tone and content of each slide",
                                        nullable: true
                                    }
                                },
                                required: ["color"],
                                propertyOrdering: ["color", "gradient"],
                                nullable: false
                            }
                        },// end of properties
                        required: ["id", "title", "type", "content", "background"],
                        propertyOrdering: ["id", "title", "type", "content", "background"],
                        nullable: false
                    }//end of slide object
                }// end of slides array
            },
            required: ["title", "slides"],
            propertyOrdering: ["title", "slides"],
            nullable: false
        }// end of schema object

        return schema as any as Schema;
    }
}
