// import { Module } from '@nestjs/common';
// import { CardService } from './card.service';

// @Module({
//   providers: [CardService]
// })
// export class CardModule {}

import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { DatabaseModule } from '../database/database.module';
import { CardController } from './card.controller';
import { LoggingService } from '../logs/logging.service';

@Module({
  imports: [DatabaseModule,],
  controllers: [CardController],
  providers: [CardService, LoggingService],
})
export class CardModule {}
