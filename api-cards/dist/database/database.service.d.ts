import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Knex } from 'knex';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private knexInstance;
    onModuleInit(): Promise<void>;
    getKnexInstance(): Knex;
    query(tableName: string, conditions?: any): Promise<any>;
    transaction<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T>;
    onModuleDestroy(): Promise<void>;
}
