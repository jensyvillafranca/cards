import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadCardService {
  async findAll(connection: any) {
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

    const result = await connection.query(query);

    const cardsMap = new Map();

    result[0].forEach((row: any) => {
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
  }

  async findOne(id: number, connection: any) {
    const query = `
      SELECT 
          c.titleCard, 
          c.createdAt, 
          d.description 
      FROM cards c
      LEFT JOIN descriptions d ON c.idCard = d.idCard
      WHERE c.idCard = ?`;

    const [results]: any = await connection.execute(query, [id]);

    if (results.length > 0) {
      const card = {
        title: results[0].titleCard,
        createdAt: results[0].createdAt,
        descriptions: results.map((row: any) => ({
          description: row.description,
        })),
      };
      return card;
    }

    return null;
  }
}