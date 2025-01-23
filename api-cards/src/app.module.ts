import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './cards/card.module';
import { LoggingService } from './logs/logging.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    CardModule,
  ],
  providers: [
    LoggingService, 
    DatabaseService,
  ],
  exports: [
    LoggingService, 
    DatabaseService,
  ],
})
export class AppModule {}
