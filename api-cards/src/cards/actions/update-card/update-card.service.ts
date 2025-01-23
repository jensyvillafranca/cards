import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from '../update-card/update-card.dto';
import { Knex } from 'knex';

@Injectable()
export class UpdateCardService {
  async update(id: number, updateCardDto: UpdateCardDto, connection: Knex.Transaction) {
    const { title, descriptions } = updateCardDto;

    try {
      if (title) {
        await connection('cards')
          .where('idCard', id)
          .update({ titleCard: title });
      }

      if (descriptions && descriptions.length > 0) {
        const existingDescriptions = await connection('descriptions')
          .where('idCard', id)
          .select('idDescription');

        const existingIds = existingDescriptions.map((desc) => desc.idDescription);
        const idsToKeep: number[] = [];

        for (const desc of descriptions) {
          const { idDescription, description } = desc;

          if (idDescription && existingIds.includes(idDescription)) {
            await connection('descriptions')
              .where({ idDescription, idCard: id })
              .update({ description });
            idsToKeep.push(idDescription);
          } else if (!idDescription) {
            const [result] = await connection('descriptions')
              .insert({ description, idCard: id })
              .returning('idDescription');
            idsToKeep.push(result.idDescription);
          }
        }

        const idsToDelete = existingIds.filter((id) => !idsToKeep.includes(id));
        if (idsToDelete.length > 0) {
          await connection('descriptions')
            .whereIn('idDescription', idsToDelete)
            .del();
        }
      }

      return {
        id,
        title,
        descriptions,
        message: 'tarjeta actualizada correctamente...',
      };
    } catch (error) {
      console.error('se produjo un error al intentar cargar la tarjeta:', error);
      throw new Error('Ocurrió un error al intentar actualizar la tarjeta.');
    }
  }
}
