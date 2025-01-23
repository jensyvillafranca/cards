import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool;
    onModuleInit(): Promise<void>;
    getConnection(): Promise<mysql.PoolConnection>;
    query(query: string, params?: any[]): Promise<any>;
    transaction(callback: (connection: mysql.PoolConnection) => Promise<any>): Promise<any>;
    onModuleDestroy(): Promise<void>;
}
