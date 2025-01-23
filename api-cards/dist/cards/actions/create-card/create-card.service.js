"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCardService = void 0;
const common_1 = require("@nestjs/common");
let CreateCardService = class CreateCardService {
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
};
exports.CreateCardService = CreateCardService;
exports.CreateCardService = CreateCardService = __decorate([
    (0, common_1.Injectable)()
], CreateCardService);
//# sourceMappingURL=create-card.service.js.map