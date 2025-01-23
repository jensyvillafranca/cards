import { Controller, Delete, Param, Req } from '@nestjs/common';
import { DeleteCardService } from '../delete-card/delete-card.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LoggingService } from '../../../logs/logging.service';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../../../interceptors/transaction.interceptor';

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
  remove(@Param('id') id: string, @Req() req: any) {
    const connection = req.connection;
    this.loggingService.log('ELIMINAR', `Se eliminó la tarjeta con el ID: ${id}`);
    return this.cardService.remove(+id, connection);
  }
}