import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class DeleteCardService {
  async remove(id: number, connection: Knex.Transaction) {
    try {
      await connection('descriptions')
        .where('idCard', id)
        .del();

      await connection('cards')
        .where('idCard', id)
        .del();

      return { message: `La tarjeta con el ID ${id} y sus descripciones han sido eliminadas...` };
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
      throw new Error('ocurrió un error al intentar eliminar...');
    }
  }
}
