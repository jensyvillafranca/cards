import { UpdateCardDto } from '../update-card/update-card.dto';
export declare class UpdateCardService {
    update(id: number, updateCardDto: UpdateCardDto, connection: any): Promise<{
        id: number;
        title: string | undefined;
        descriptions: {
            idDescription?: number;
            description: string;
        }[] | undefined;
        message: string;
    }>;
}
