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
const database_service_1 = require("../database/database.service");
let CardService = class CardService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async create(createCardDto) {
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
            catch (error) {
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
        result.forEach((row) => {
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
    async findOne(id) {
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
    async update(id, updateCardDto) {
        const { title, descriptions } = updateCardDto;
        return await this.dbService.transaction(async (connection) => {
            try {
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
            catch (error) {
                console.error('Error en la transacción de actualización:', error);
                throw error;
            }
        });
    }
    async remove(id) {
        return await this.dbService.transaction(async (connection) => {
            try {
                const deleteDescriptionsQuery = `DELETE FROM descriptions WHERE idCard = ?`;
                await connection.execute(deleteDescriptionsQuery, [id]);
                const deleteCardsQuery = `DELETE FROM cards WHERE idCard = ?`;
                await connection.execute(deleteCardsQuery, [id]);
                return { message: `La tarjeta con el ${id} y sus descripciones ha sido eliminada exitosamente` };
            }
            catch (error) {
            }
        });
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CardService);
//# sourceMappingURL=card.service.js.map