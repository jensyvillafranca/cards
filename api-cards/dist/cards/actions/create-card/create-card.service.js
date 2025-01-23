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
        try {
            const [idCard] = await connection('cards').insert({ titleCard: title, createdAt: connection.fn.now() });
            const descriptionsToInsert = descriptions
                .filter((desc) => typeof desc === 'string' && desc.trim() !== '')
                .map((desc) => ({
                description: desc.trim(),
                idCard,
            }));
            if (descriptionsToInsert.length > 0) {
                await connection('descriptions').insert(descriptionsToInsert);
            }
            return { idCard, titleCard: title, descriptions };
        }
        catch (error) {
            console.error('Error cuando se intentó crear la tarjeta...', error);
            throw error;
        }
    }
};
exports.CreateCardService = CreateCardService;
exports.CreateCardService = CreateCardService = __decorate([
    (0, common_1.Injectable)()
], CreateCardService);
//# sourceMappingURL=create-card.service.js.map