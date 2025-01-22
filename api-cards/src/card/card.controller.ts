import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { LoggingService } from '../logs/logging.service';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../interceptors/transaction.interceptor';

@ApiTags('Tarjetas')
@Controller('cards')
@UseInterceptors(TransactionInterceptor)
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarjeta' })
  @ApiResponse({ status: 201, description: 'Tarjeta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada no válidos.' })
  @ApiBody({ description: 'Cuerpo de la solicitud para crear una tarjeta', type: CreateCardDto })
  create(@Body() createCardDto: CreateCardDto, @Req() req: any) {
    const connection = req.connection;
    this.loggingService.log('INSERTAR', `Se creó tarjeta con el título: ${createCardDto.title}`);
    return this.cardService.create(createCardDto, connection);
  }

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

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarjeta específica por ID' })
  @ApiResponse({ status: 200, description: 'Tarjeta actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Tarjeta no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada no válidos.' })
  @ApiParam({ name: 'id', description: 'Identificador único de la tarjeta', type: Number })
  @ApiBody({ description: 'Cuerpo de la solicitud para actualizar la tarjeta', type: UpdateCardDto })
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Req() req: any) {
    const connection = req.connection;
    this.loggingService.log('ACTUALIZAR', `Se actualizó la tarjeta con el ID: ${id}`);
    return this.cardService.update(+id, updateCardDto, connection);
  }

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
