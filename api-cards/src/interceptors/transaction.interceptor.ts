import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly databaseService: DatabaseService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();

      const connection = await this.databaseService.getConnection();
      await connection.beginTransaction();
      console.log('Transacción iniciada');

      request.connection = connection; // aquí se lo paso al controlador

      return next.handle().pipe(
          tap(async () => {
              await connection.commit();
              console.log('Transacción confirmada (commit)');
              connection.release(); 
          }),
          catchError(async (error) => {
              await connection.rollback();
              console.error('Transacción revertida (rollback) debido a un error:', error);
              connection.release(); 
              throw error;
          }),
      );
  }
}
