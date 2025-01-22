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
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
  
      return new Observable((observer) => {
        this.databaseService.transaction(async (connection) => {
          request.connection = connection; 
          return next.handle().toPromise();
        })
          .then((result) => {
            observer.next(result);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }
  }
  