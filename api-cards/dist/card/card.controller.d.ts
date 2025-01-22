import { CardService } from './card.service';
import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
import { LoggingService } from '../logs/logging.service';
import { Request } from 'express';
export declare class CardController {
    private readonly cardService;
    private readonly loggingService;
    constructor(cardService: CardService, loggingService: LoggingService);
    create(createCardDto: CreateCardDto, req: Request): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
    update(id: string, updateCardDto: UpdateCardDto, req: Request): Promise<any>;
    remove(id: string, req: Request): Promise<any>;
}
