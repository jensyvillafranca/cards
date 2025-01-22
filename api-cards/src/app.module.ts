import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { LoggingService } from './logs/logging.service';

@Module({
  imports: [CardModule],
  // controllers: [AppController],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class AppModule {}
