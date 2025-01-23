"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCardService = void 0;
const common_1 = require("@nestjs/common");
let ReadCardService = class ReadCardService {
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
};
exports.ReadCardService = ReadCardService;
exports.ReadCardService = ReadCardService = __decorate([
    (0, common_1.Injectable)()
], ReadCardService);
//# sourceMappingURL=read-card.service.js.map