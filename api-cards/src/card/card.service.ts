import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/createcard.dto';
import { UpdateCardDto } from './dto/updatecard.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CardService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createCardDto: CreateCardDto) {
    const { title, descriptions } = createCardDto;

    if (!title) {
      throw new Error('El titulo es requerido.');
    }
    if (!descriptions || !Array.isArray(descriptions)) {
      throw new Error('Las descripciones deben ser una matriz válida.');
    }

    const query = `
      INSERT INTO cards (titleCard, createdAt) 
      VALUES (?, NOW())
    `;
    const queryInsertDescriptions = `
      INSERT INTO descriptions (description, idCard) 
      VALUES (?, ?)
    `;

    try {
      const result = await this.dbService.query(query, [title]);
      const idCard = result.insertId; 
      for (const desc of descriptions) {
        if (typeof desc !== 'string') {
          throw new Error('Cada descripción debe ser un string.');
        }
        await this.dbService.query(queryInsertDescriptions, [desc, idCard]);
      }

      return { idCard, titleCard: title, descriptions };
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw error;
    }
  }

  async findAll() {
    const query = `
        SELECT 
            c.titleCard,
            c.createdAt,
            d.description
        FROM 
            cards c
        LEFT JOIN 
            descriptions d
        ON 
            c.idCard = d.idCard
    `;

    const result = await this.dbService.query(query);

    const cardsMap = new Map();

    result.forEach((row: any) => {
        if (!cardsMap.has(row.titleCard)) {
            cardsMap.set(row.titleCard, {
              titleCard: row.titleCard,
              createdAt: row.createdAt,
              descriptions: [],
            });
        }
        if (row.description) {
          cardsMap.get(row.titleCard).descriptions.push(row.description);
        }
    });
    return Array.from(cardsMap.values());
}


  async findOne(id: number) {
    const query = `SELECT * FROM cards WHERE id = ?`;
    const [card] = await this.dbService.query(query, [id]);
    if (card) {
      card.descriptions = JSON.parse(card.descriptions);
    }
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const { title, descriptions } = updateCardDto;
  
    if (title) {
      const queryUpdateCard = `UPDATE cards SET titleCard = ? WHERE idCard = ?`;
      await this.dbService.query(queryUpdateCard, [title, id]);
    }
  
    if (descriptions && descriptions.length > 0) {
      for (const desc of descriptions) {
        const { idDescription, description } = desc;
  
        if (idDescription) {
          const queryUpdateDescription = `
            UPDATE descriptions SET description = ? WHERE idDescription = ? AND idCard = ?
          `;
          await this.dbService.query(queryUpdateDescription, [description, idDescription, id]);
        }
      }
    }
    return { id, title, descriptions };
  }
  

  async remove(id: number) {
    const query = `DELETE FROM cards WHERE id = ?`;
    await this.dbService.query(query, [id]);
    return { message: `Card with id ${id} deleted successfully.` };
  }
}
