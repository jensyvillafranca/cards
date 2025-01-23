import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from '../update-card/update-card.dto';

@Injectable()
export class UpdateCardService {
  async update(id: number, updateCardDto: UpdateCardDto, connection: any) {
    const { title, descriptions } = updateCardDto;

    if (title) {
      // Actualizar título si está presente
      const queryUpdateCard = `UPDATE cards SET titleCard = ? WHERE idCard = ?`;
      await connection.execute(queryUpdateCard, [title, id]);
    }

    if (descriptions && descriptions.length > 0) {
      // Obtener IDs existentes
      const existingDescriptionsQuery = `SELECT idDescription FROM descriptions WHERE idCard = ?`;
      const [existingDescriptions]: any = await connection.execute(existingDescriptionsQuery, [id]);
      const existingIds = existingDescriptions.map((desc: any) => desc.idDescription);

      const idsToKeep: number[] = [];

      for (const desc of descriptions) {
        const { idDescription, description } = desc;

        if (idDescription && existingIds.includes(idDescription)) {
          // Actualizar descripciones existentes
          const queryUpdateDescription = `
            UPDATE descriptions 
            SET description = ? 
            WHERE idDescription = ? AND idCard = ?
          `;
          await connection.execute(queryUpdateDescription, [description, idDescription, id]);
          idsToKeep.push(idDescription);
        } else if (!idDescription) {
          // Insertar nuevas descripciones
          const queryInsertDescription = `
            INSERT INTO descriptions (description, idCard) 
            VALUES (?, ?)
          `;
          const [result]: any = await connection.execute(queryInsertDescription, [description, id]);
          idsToKeep.push(result.insertId);
        }
      }

      // Eliminar descripciones que ya no están en el array
      const idsToDelete = existingIds.filter((id) => !idsToKeep.includes(id));
      if (idsToDelete.length > 0) {
        const queryDeleteDescriptions = `DELETE FROM descriptions WHERE idDescription IN (?)`;
        await connection.execute(queryDeleteDescriptions, [idsToDelete]);
      }
    }

    return {
      id,
      title,
      descriptions,
      message: 'Tarjeta actualizada exitosamente.',
    };
  }
}
