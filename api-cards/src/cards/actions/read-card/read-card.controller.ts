import { Controller, Get, Param, Req } from '@nestjs/common';
import { ReadCardService } from '../read-card/read-card.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../../../interceptors/transaction.interceptor';

@ApiTags('Tarjetas')
@Controller('cards')
@UseInterceptors(TransactionInterceptor)
export class ReadCardController {
  constructor(private readonly cardService: ReadCardService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tarjetas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las tarjetas.' })
  findAll(@Req() req: any) {
    const connection = req.connection;
    return this.cardService.findAll(connection);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarjeta específica por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la tarjeta solicitada.' })
  @ApiResponse({ status: 404, description: 'Tarjeta no encontrada.' })
  @ApiParam({ name: 'id', description: 'Identificador único de la tarjeta', type: Number })
  findOne(@Param('id') id: string, @Req() req: any) {
    const connection = req.connection;
    return this.cardService.findOne(+id, connection);
  }
}