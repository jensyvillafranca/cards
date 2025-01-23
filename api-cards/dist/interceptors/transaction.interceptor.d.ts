import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
export declare class TransactionInterceptor implements NestInterceptor {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
