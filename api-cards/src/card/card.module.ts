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

@Module({
  imports: [DatabaseModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
