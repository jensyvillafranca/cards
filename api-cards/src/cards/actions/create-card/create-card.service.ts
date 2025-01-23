import { Injectable } from '@nestjs/common';
import { CreateCardDto } from '../create-card/create-card.dto';
import { Knex } from 'knex';

@Injectable()
export class CreateCardService {
  async create(createCardDto: CreateCardDto, connection: Knex.Transaction) {
    const { title, descriptions } = createCardDto;

    if (!title) {
      throw new Error('El título es requerido.');
    }

    if (!descriptions || !Array.isArray(descriptions)) {
      throw new Error('Las descripciones deben ser una matriz válida.');
    }

    try {
      const [idCard] = await connection('cards').insert(
        { titleCard: title, createdAt: connection.fn.now() }
      );

      const descriptionsToInsert = descriptions
        .filter((desc) => typeof desc === 'string' && desc.trim() !== '')
        .map((desc) => ({
          description: desc.trim(),
          idCard,
        }));

      if (descriptionsToInsert.length > 0) {
        await connection('descriptions').insert(descriptionsToInsert);
      }

      return { idCard, titleCard: title, descriptions };
    } catch (error) {
      console.error('Error cuando se intentó crear la tarjeta...', error);
      throw error;
    }
  }
}
