import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiPropertyOptional({
    description: 'Titulo actualizado de la tarjeta',
    example: 'Nuevo Titulo',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripciones de la tarjeta',
    example: [
      {description: 'Nueva descripción 1' },
      {description: 'Nueva descripción 2' }
    ],
    type: [Object],
  })
  descriptions?: { idDescription?: number; description: string }[];
}
