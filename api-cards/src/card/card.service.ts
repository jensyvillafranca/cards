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
  
    return await this.dbService.transaction(async (connection) => {
      try {
        const [cardResult]: any = await connection.execute(queryInsertCard, [title]);
        const idCard = cardResult.insertId;
  
        for (const desc of descriptions) {
          if (typeof desc !== 'string' || desc.trim() === '') {
            //console.warn('Descripción no válida:', desc);
            continue;
          }
          await connection.execute(queryInsertDescriptions, [desc.trim(), idCard]);
        }
  
        return { idCard, titleCard: title, descriptions };
      } catch (error) {
        console.error('Error al insertar la tarjeta y descripciones:', error);
        throw error;
      }
    });
  }
  

  async findAll() {
    const query = `
        SELECT 
            c.idCard,
            c.titleCard,
            c.createdAt,
            d.description,
            d.idDescription
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
              idCard: row.idCard,
              titleCard: row.titleCard,
              createdAt: row.createdAt,
              descriptions: [],
            });
        }
        if (row.idDescription && row.description) {
          cardsMap.get(row.titleCard).descriptions.push({
              idDescription: row.idDescription,
              description: row.description,
          });
      }
    });
    return Array.from(cardsMap.values());
}


  async findOne(id: number) {
    const query = `
        SELECT 
            c.titleCard, 
            c.createdAt, 
            d.description 
        FROM cards c
        LEFT JOIN descriptions d ON c.idCard = d.idCard
        WHERE c.idCard = ?`;
    
    const results = await this.dbService.query(query, [id]);

    if (results.length > 0) {
        const card = {
            title: results[0].titleCard,
            createdAt: results[0].createdAt,
            descriptions: results.map(row => ({
                description: row.description
            }))
        };
        return card;
    }

    return null;
  }
  
  async update(id: number, updateCardDto: UpdateCardDto) {
    const { title, descriptions } = updateCardDto;
  
    return await this.dbService.transaction(async (connection) => {
      try {
        if (title) {
          const queryUpdateCard = `UPDATE cards SET titleCard = ? WHERE idCard = ?`;
          await connection.execute(queryUpdateCard, [title, id]);
        }

        if (descriptions && descriptions.length > 0) {
          const existingDescriptionsQuery = `SELECT idDescription FROM descriptions WHERE idCard = ?`;
          const [existingDescriptions]: any = await connection.execute(existingDescriptionsQuery, [id]);
  
          const existingIds = existingDescriptions.map((desc: any) => desc.idDescription);
  
          for (const desc of descriptions) {
            const { idDescription, description } = desc;
  
            if (idDescription && existingIds.includes(idDescription)) {
              const queryUpdateDescription = `
                UPDATE descriptions SET description = ? WHERE idDescription = ? AND idCard = ?
              `;
              await connection.execute(queryUpdateDescription, [description, idDescription, id]);
            } else if (!idDescription) {
              const queryInsertDescription = `
                INSERT INTO descriptions (description, idCard) VALUES (?, ?)
              `;
              await connection.execute(queryInsertDescription, [description, id]);
            }
          }
        }
  
        return { id, title, descriptions };
      } catch (error) {
        console.error('Error en la transacción de actualización:', error);
        throw error;
      }
    });
  }
  
  async remove(id: number) {
    return await this.dbService.transaction( async (connection) => {
      try {
        const deleteDescriptionsQuery = `DELETE FROM descriptions WHERE idCard = ?`;
        await connection.execute(deleteDescriptionsQuery, [id]);
  
        const deleteCardsQuery = `DELETE FROM cards WHERE idCard = ?`;
        await connection.execute(deleteCardsQuery, [id]);
  
        return { message: `La tarjeta con el ${id} y sus descripciones ha sido eliminada exitosamente` };
      } catch(error){

      }

    });
    
  }
  
  
}
