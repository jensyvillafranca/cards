import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';
import { Knex } from 'knex';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly databaseService: DatabaseService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const trx: Knex.Transaction = await this.databaseService
      .getKnexInstance()
      .transaction();
    console.log('Transacción iniciada con Knex');

    request.connection = trx;

    return next.handle().pipe(
      tap(async () => {
        await trx.commit();
        console.log('Transacción confirmada (commit)');
      }),
      catchError(async (error) => {
        await trx.rollback();
        console.error(
          'Transacción revertida (rollback) debido a un error:',
          error,
        );
        throw error;
      }),
    );
  }
}
