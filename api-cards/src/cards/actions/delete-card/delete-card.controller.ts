import { Controller, Delete, Param, Req } from '@nestjs/common';
import { DeleteCardService } from '../delete-card/delete-card.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LoggingService } from '../../../logs/logging.service';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../../../interceptors/transaction.interceptor';
import { Knex } from 'knex';

@ApiTags('Tarjetas')
@Controller('cards')
@UseInterceptors(TransactionInterceptor)
export class DeleteCardController {
  constructor(
    private readonly cardService: DeleteCardService,
    private readonly loggingService: LoggingService,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarjeta específica por ID' })
  @ApiResponse({ status: 200, description: 'Tarjeta eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Tarjeta no encontrada.' })
  @ApiParam({ name: 'id', description: 'Identificador único de la tarjeta', type: Number })
  async remove(@Param('id') id: string, @Req() req: any) {
    const connection: Knex.Transaction = req.connection; 
    try {
      this.loggingService.log('ELIMINAR', `Se eliminó la tarjeta con el ID: ${id}`);
      const result = await this.cardService.remove(+id, connection);
      return {
        message: 'tarjeta eliminada exitosamente...',
        data: result,
      };
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
      throw error;
    }
  }
}
