import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateCardService } from './create-card.service';
import { CreateCardDto } from './create-card.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoggingService } from '../../../logs/logging.service';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../../../interceptors/transaction.interceptor';
import { Knex } from 'knex';

@ApiTags('Tarjetas')
@Controller('cards')
@UseInterceptors(TransactionInterceptor)
export class CreateCardController {
  constructor(
    private readonly cardService: CreateCardService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarjeta' })
  @ApiResponse({ status: 201, description: 'Tarjeta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada no válidos.' })
  @ApiBody({ description: 'Cuerpo de la solicitud para crear una tarjeta', type: CreateCardDto })
  async create(@Body() createCardDto: CreateCardDto, @Req() req: any) {
    const connection: Knex.Transaction = req.connection;

    try {
      this.loggingService.log('INSERTAR', `Se creó tarjeta con el título: ${createCardDto.title}`,
      );
      const result = await this.cardService.create(createCardDto, connection);
      return {
        message: 'tarjeta creada exitosamente...',
        data: result,
      };
    } catch (error) {
      console.error('Error al crear tarjeta:', error);
      throw error;
    }
  }
}
