import { ReadCardService } from '../read-card/read-card.service';
export declare class ReadCardController {
    private readonly cardService;
    constructor(cardService: ReadCardService);
    findAll(req: any): Promise<any[]>;
    findOne(id: string, req: any): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
}
