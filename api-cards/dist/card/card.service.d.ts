import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
import { DatabaseService } from '../database/database.service';
export declare class CardService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    create(createCardDto: CreateCardDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
    update(id: number, updateCardDto: UpdateCardDto): Promise<any>;
    remove(id: number): Promise<any>;
}
