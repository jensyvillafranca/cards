import { CardService } from './card.service';
import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
import { LoggingService } from '../logs/logging.service';
export declare class CardController {
    private readonly cardService;
    private readonly loggingService;
    constructor(cardService: CardService, loggingService: LoggingService);
    create(createCardDto: CreateCardDto, req: any): Promise<{
        idCard: any;
        titleCard: string;
        descriptions: string[];
    }>;
    findAll(req: any): Promise<any[]>;
    findOne(id: string, req: any): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
    update(id: string, updateCardDto: UpdateCardDto, req: any): Promise<{
        id: number;
        title: string | undefined;
        descriptions: {
            idDescription?: number;
            description: string;
        }[] | undefined;
        message: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
