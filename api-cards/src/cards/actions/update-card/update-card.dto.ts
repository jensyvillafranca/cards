import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CardDescriptionDto {
  @ApiPropertyOptional({
    description: 'ID de la descripción',
    example: 1,
  })
  idDescription?: number;

  @ApiProperty({
    description: 'Texto de la descripción',
    example: 'Nueva descripción',
  })
  description: string;
}

export class UpdateCardDto {
  @ApiPropertyOptional({
    description: 'Título actualizado de la tarjeta',
    example: 'Nuevo Título',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Lista de descripciones de la tarjeta',
    example: [
      { idDescription: 1, description: 'Nueva descripción 1' },
      { idDescription: 2, description: 'Nueva descripción 2' },
    ],
    type: [CardDescriptionDto],
  })
  descriptions?: CardDescriptionDto[];
}

