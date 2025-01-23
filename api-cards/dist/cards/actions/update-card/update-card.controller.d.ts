import { UpdateCardService } from '../update-card/update-card.service';
import { UpdateCardDto } from '../update-card/update-card.dto';
import { LoggingService } from '../../../logs/logging.service';
export declare class UpdateCardController {
    private readonly cardService;
    private readonly loggingService;
    constructor(cardService: UpdateCardService, loggingService: LoggingService);
    update(id: string, updateCardDto: UpdateCardDto, req: any): Promise<{
        message: string;
        data: {
            id: number;
            title: string | undefined;
            descriptions: {
                idDescription?: number;
                description: string;
            }[] | undefined;
            message: string;
        };
    }>;
}
