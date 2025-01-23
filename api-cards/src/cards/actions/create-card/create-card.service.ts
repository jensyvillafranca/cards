import { Injectable } from '@nestjs/common';
import { CreateCardDto } from '../create-card/create-card.dto';

@Injectable()
export class CreateCardService {
  async create(createCardDto: CreateCardDto, connection: any) {
    const { title, descriptions } = createCardDto;

    if (!title) {
      throw new Error('El título es requerido.');
    }

    if (!descriptions || !Array.isArray(descriptions)) {
      throw new Error('Las descripciones deben ser una matriz válida.');
    }

    const queryInsertCard = `
      INSERT INTO cards (titleCard, createdAt) 
      VALUES (?, NOW())
    `;
    const queryInsertDescriptions = `
      INSERT INTO descriptions (description, idCard) 
      VALUES (?, ?)
    `;

    const [cardResult]: any = await connection.execute(queryInsertCard, [title]);
    const idCard = cardResult.insertId;

    for (const desc of descriptions) {
      if (typeof desc !== 'string' || desc.trim() === '') {
        continue;
      }
      await connection.execute(queryInsertDescriptions, [desc.trim(), idCard]);
    }

    return { idCard, titleCard: title, descriptions };
  }
}
