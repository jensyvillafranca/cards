"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
let CardService = class CardService {
    constructor() { }
    async create(createCardDto, connection) {
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
        const [cardResult] = await connection.execute(queryInsertCard, [title]);
        const idCard = cardResult.insertId;
        for (const desc of descriptions) {
            if (typeof desc !== 'string' || desc.trim() === '') {
                continue;
            }
            await connection.execute(queryInsertDescriptions, [desc.trim(), idCard]);
        }
        return { idCard, titleCard: title, descriptions };
    }
    async findAll(connection) {
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
        result[0].forEach((row) => {
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
    async findOne(id, connection) {
        const query = `
      SELECT 
          c.titleCard, 
          c.createdAt, 
          d.description 
      FROM cards c
      LEFT JOIN descriptions d ON c.idCard = d.idCard
      WHERE c.idCard = ?`;
        const [results] = await connection.execute(query, [id]);
        if (results.length > 0) {
            const card = {
                title: results[0].titleCard,
                createdAt: results[0].createdAt,
                descriptions: results.map((row) => ({
                    description: row.description,
                })),
            };
            return card;
        }
        return null;
    }
    async update(id, updateCardDto, connection) {
        const { title, descriptions } = updateCardDto;
        if (title) {
            const queryUpdateCard = `UPDATE cards SET titleCard = ? WHERE idCard = ?`;
            await connection.execute(queryUpdateCard, [title, id]);
        }
        if (descriptions && descriptions.length > 0) {
            const existingDescriptionsQuery = `SELECT idDescription FROM descriptions WHERE idCard = ?`;
            const [existingDescriptions] = await connection.execute(existingDescriptionsQuery, [id]);
            const existingIds = existingDescriptions.map((desc) => desc.idDescription);
            for (const desc of descriptions) {
                const { idDescription, description } = desc;
                if (idDescription && existingIds.includes(idDescription)) {
                    const queryUpdateDescription = `
            UPDATE descriptions SET description = ? WHERE idDescription = ? AND idCard = ?
          `;
                    await connection.execute(queryUpdateDescription, [description, idDescription, id]);
                }
                else if (!idDescription) {
                    const queryInsertDescription = `
            INSERT INTO descriptions (description, idCard) VALUES (?, ?)
          `;
                    await connection.execute(queryInsertDescription, [description, id]);
                }
            }
        }
        return { id, title, descriptions };
    }
    async remove(id, connection) {
        const deleteDescriptionsQuery = `DELETE FROM descriptions WHERE idCard = ?`;
        await connection.execute(deleteDescriptionsQuery, [id]);
        const deleteCardsQuery = `DELETE FROM cards WHERE idCard = ?`;
        await connection.execute(deleteCardsQuery, [id]);
        return { message: `La tarjeta con el ID ${id} y sus descripciones han sido eliminadas exitosamente` };
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CardService);
//# sourceMappingURL=card.service.js.map