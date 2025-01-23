import { Controller, Get, Param, Req } from '@nestjs/common';
import { ReadCardService } from '../read-card/read-card.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../../../interceptors/transaction.interceptor';
import { Knex } from 'knex';

@ApiTags('Tarjetas')
@Controller('cards')
@UseInterceptors(TransactionInterceptor)
export class ReadCardController {
  constructor(private readonly cardService: ReadCardService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tarjetas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las tarjetas.' })
  async findAll(@Req() req: any) {
    const connection: Knex.Transaction = req.connection;

    try {
      const result = await this.cardService.findAll(connection);
      return {
        message: 'tarjetas leídas exitosamente...',
        data: result,
      };
    } catch (error) {
      console.error('Error al obtener todas las tarjetas:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarjeta específica por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la tarjeta solicitada.' })
  @ApiResponse({ status: 404, description: 'Tarjeta no encontrada.' })
  @ApiParam({ name: 'id', description: 'Identificador único de la tarjeta', type: Number })
  async findOne(@Param('id') id: string, @Req() req: any) {
    const connection: Knex.Transaction = req.connection;

    try {
      const result = await this.cardService.findOne(+id, connection);
      if (!result) {
        return {
          message: `no se encontro ninguna tarjeta con ${id}.`,
        };
      }
      return {
        message: 'tarjeta leída exitosamente...',
        data: result,
      };
    } catch (error) {
      console.error(`Error al obtener la tarjeta con ID ${id}:`, error);
      throw error;
    }
  }
}