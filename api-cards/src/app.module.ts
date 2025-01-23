import { Module } from '@nestjs/common';
import { CardModule } from './cards/card.module';
import { LoggingService } from './logs/logging.service';

@Module({
  imports: [
    CardModule,
  ],
  providers: [
    LoggingService, 
  ],
  exports: [
    LoggingService, 
  ],
})
export class AppModule {}
