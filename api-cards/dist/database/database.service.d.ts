import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private connection;
    onModuleInit(): Promise<void>;
    query(query: string, params?: any[]): Promise<any>;
    onModuleDestroy(): Promise<void>;
}
