import { UpdateCardDto } from '../update-card/update-card.dto';
import { Knex } from 'knex';
export declare class UpdateCardService {
    update(id: number, updateCardDto: UpdateCardDto, connection: Knex.Transaction): Promise<{
        id: number;
        title: string | undefined;
        descriptions: {
            idDescription?: number;
            description: string;
        }[] | undefined;
        message: string;
    }>;
}
