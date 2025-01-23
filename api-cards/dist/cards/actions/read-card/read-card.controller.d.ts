import { ReadCardService } from '../read-card/read-card.service';
export declare class ReadCardController {
    private readonly cardService;
    constructor(cardService: ReadCardService);
    findAll(req: any): Promise<{
        message: string;
        data: any[];
    }>;
    findOne(id: string, req: any): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: {
            title: any;
            createdAt: any;
            descriptions: {
                description: any;
            }[];
        };
    }>;
}
