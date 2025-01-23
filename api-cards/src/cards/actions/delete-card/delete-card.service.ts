import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCardService {
  async remove(id: number, connection: any) {
    const deleteDescriptionsQuery = `DELETE FROM descriptions WHERE idCard = ?`;
    await connection.execute(deleteDescriptionsQuery, [id]);

    const deleteCardsQuery = `DELETE FROM cards WHERE idCard = ?`;
    await connection.execute(deleteCardsQuery, [id]);

    return { message: `La tarjeta con el ID ${id} y sus descripciones han sido eliminadas exitosamente` };
  }
}