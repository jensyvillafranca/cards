import { Controller, Put, Body, Param, Req } from '@nestjs/common';
import { UpdateCardService } from '../update-card/update-card.service';
import { UpdateCardDto } from '../update-card/update-card.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { LoggingService } from '../../../logs/logging.service';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../../../interceptors/transaction.interceptor';
import { Knex } from 'knex';

@ApiTags('Tarjetas')
@Controller('cards')
@UseInterceptors(TransactionInterceptor)
export class UpdateCardController {
  constructor(
    private readonly cardService: UpdateCardService,
    private readonly loggingService: LoggingService,
  ) {}

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarjeta específica por ID' })
  @ApiResponse({ status: 200, description: 'Tarjeta actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Tarjeta no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada no válidos.' })
  @ApiParam({ name: 'id', description: 'Identificador único de la tarjeta', type: Number })
  @ApiBody({ description: 'Cuerpo de la solicitud para actualizar la tarjeta', type: UpdateCardDto })
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Req() req: any) {
    const connection: Knex.Transaction = req.connection;

    try {
      this.loggingService.log('ACTUALIZAR', `Se actualizó la tarjeta con el ID: ${id}`);
      const result = await this.cardService.update(+id, updateCardDto, connection);
      return {
        message: 'tarjeta actualizada exitosamente...',
        data: result,
      };
    } catch (error) {
      console.error('Error al actualizar tarjeta:', error);
      throw error;
    }
  }
}