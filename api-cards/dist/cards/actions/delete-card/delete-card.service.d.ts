import { Knex } from 'knex';
export declare class DeleteCardService {
    remove(id: number, connection: Knex.Transaction): Promise<{
        message: string;
    }>;
}
