import { CardService } from './card.service';
import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    create(createCardDto: CreateCardDto): Promise<{
        idCard: any;
        titleCard: string;
        descriptions: string[];
    }>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
    update(id: string, updateCardDto: UpdateCardDto): Promise<{
        id: number;
        title: string | undefined;
        descriptions: {
            idDescription?: number;
            description: string;
        }[] | undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
