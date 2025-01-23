import { CreateCardDto } from '../create-card/create-card.dto';
export declare class CreateCardService {
    create(createCardDto: CreateCardDto, connection: any): Promise<{
        idCard: any;
        titleCard: string;
        descriptions: string[];
    }>;
}
