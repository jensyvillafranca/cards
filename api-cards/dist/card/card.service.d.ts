import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
export declare class CardService {
    constructor();
    create(createCardDto: CreateCardDto, connection: any): Promise<{
        idCard: any;
        titleCard: string;
        descriptions: string[];
    }>;
    findAll(connection: any): Promise<any[]>;
    findOne(id: number, connection: any): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
    update(id: number, updateCardDto: UpdateCardDto, connection: any): Promise<{
        id: number;
        title: string | undefined;
        descriptions: {
            idDescription?: number;
            description: string;
        }[] | undefined;
    }>;
    remove(id: number, connection: any): Promise<{
        message: string;
    }>;
}
