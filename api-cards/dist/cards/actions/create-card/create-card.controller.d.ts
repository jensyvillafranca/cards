import { CreateCardService } from './create-card.service';
import { CreateCardDto } from './create-card.dto';
import { LoggingService } from '../../../logs/logging.service';
export declare class CreateCardController {
    private readonly cardService;
    private readonly loggingService;
    constructor(cardService: CreateCardService, loggingService: LoggingService);
    create(createCardDto: CreateCardDto, req: any): Promise<{
        message: string;
        data: {
            idCard: number;
            titleCard: string;
            descriptions: string[];
        };
    }>;
}
