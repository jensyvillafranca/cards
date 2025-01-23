import { DeleteCardService } from '../delete-card/delete-card.service';
import { LoggingService } from '../../../logs/logging.service';
export declare class DeleteCardController {
    private readonly cardService;
    private readonly loggingService;
    constructor(cardService: DeleteCardService, loggingService: LoggingService);
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
