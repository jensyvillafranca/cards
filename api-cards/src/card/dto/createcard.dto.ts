import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Titulo de la tarjeta',
    example: 'Tarjeta de ejemplo',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripciones de la tarjeta',
    example: ['Descripcion 1', 'Descripcion 2'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  descriptions: string[];
}