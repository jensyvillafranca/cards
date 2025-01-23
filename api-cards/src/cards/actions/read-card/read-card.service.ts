import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class ReadCardService {
  async findAll(connection: Knex.Transaction) {
    try {
      const results = await connection('cards as c')
        .leftJoin('descriptions as d', 'c.idCard', 'd.idCard')
        .select(
          'c.idCard',
          'c.titleCard',
          'c.createdAt',
          'd.description',
          'd.idDescription'
        );

      const cardsMap = new Map();

      results.forEach((row) => {
        if (!cardsMap.has(row.idCard)) {
          cardsMap.set(row.idCard, {
            idCard: row.idCard,
            titleCard: row.titleCard,
            createdAt: row.createdAt,
            descriptions: [],
          });
        }
        if (row.idDescription && row.description) {
          cardsMap.get(row.idCard).descriptions.push({
            idDescription: row.idDescription,
            description: row.description,
          });
        }
      });

      return Array.from(cardsMap.values());
    } catch (error) {
      console.error('se produjo un error al intentar cargar las tarjetas', error);
      throw new Error('Ocurrió un error al intentar obtener las tarjetas.');
    }
  }

  async findOne(id: number, connection: Knex.Transaction) {
    try {
      const results = await connection('cards as c')
        .leftJoin('descriptions as d', 'c.idCard', 'd.idCard')
        .select('c.titleCard', 'c.createdAt', 'd.description')
        .where('c.idCard', id);

      if (results.length > 0) {
        const card = {
          title: results[0].titleCard,
          createdAt: results[0].createdAt,
          descriptions: results
            .filter((row) => row.description)
            .map((row) => ({ description: row.description })),
        };
        return card;
      }

      return null;
    } catch (error) {
      console.error('se produjo un error al intentar cargar la tarjeta', error);
      throw new Error('Ocurrió un error al intentar obtener la tarjeta.');
    }
  }
}