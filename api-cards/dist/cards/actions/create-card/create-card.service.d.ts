import { CreateCardDto } from '../create-card/create-card.dto';
import { Knex } from 'knex';
export declare class CreateCardService {
    create(createCardDto: CreateCardDto, connection: Knex.Transaction): Promise<{
        idCard: number;
        titleCard: string;
        descriptions: string[];
    }>;
}
