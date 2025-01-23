import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LoggingService } from '../logs/logging.service';

import { CreateCardController } from './actions/create-card/create-card.controller';
import { ReadCardController } from './actions/read-card/read-card.controller';
import { UpdateCardController } from './actions/update-card/update-card.controller';
import { DeleteCardController } from './actions/delete-card/delete-card.controller';

import { CreateCardService } from './actions/create-card/create-card.service';
import { ReadCardService } from './actions/read-card/read-card.service';
import { UpdateCardService } from './actions/update-card/update-card.service';
import { DeleteCardService } from './actions/delete-card/delete-card.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCardController,
    ReadCardController,
    UpdateCardController,
    DeleteCardController,
  ],
  providers: [
    CreateCardService,
    ReadCardService,
    UpdateCardService,
    DeleteCardService,
    LoggingService,
  ],
})
export class CardModule {}
