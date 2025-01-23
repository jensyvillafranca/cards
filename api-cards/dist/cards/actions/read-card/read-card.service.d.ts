import { Knex } from 'knex';
export declare class ReadCardService {
    findAll(connection: Knex.Transaction): Promise<any[]>;
    findOne(id: number, connection: Knex.Transaction): Promise<{
        title: any;
        createdAt: any;
        descriptions: {
            description: any;
        }[];
    } | null>;
}
