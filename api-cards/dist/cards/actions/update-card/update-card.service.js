"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardService = void 0;
const common_1 = require("@nestjs/common");
let UpdateCardService = class UpdateCardService {
    async update(id, updateCardDto, connection) {
        const { title, descriptions } = updateCardDto;
        try {
            if (title) {
                await connection('cards')
                    .where('idCard', id)
                    .update({ titleCard: title });
            }
            if (descriptions && descriptions.length > 0) {
                const existingDescriptions = await connection('descriptions')
                    .where('idCard', id)
                    .select('idDescription');
                const existingIds = existingDescriptions.map((desc) => desc.idDescription);
                const idsToKeep = [];
                for (const desc of descriptions) {
                    const { idDescription, description } = desc;
                    if (idDescription && existingIds.includes(idDescription)) {
                        await connection('descriptions')
                            .where({ idDescription, idCard: id })
                            .update({ description });
                        idsToKeep.push(idDescription);
                    }
                    else if (!idDescription) {
                        const [result] = await connection('descriptions')
                            .insert({ description, idCard: id })
                            .returning('idDescription');
                        idsToKeep.push(result.idDescription);
                    }
                }
                const idsToDelete = existingIds.filter((id) => !idsToKeep.includes(id));
                if (idsToDelete.length > 0) {
                    await connection('descriptions')
                        .whereIn('idDescription', idsToDelete)
                        .del();
                }
            }
            return {
                id,
                title,
                descriptions,
                message: 'tarjeta actualizada correctamente...',
            };
        }
        catch (error) {
            console.error('se produjo un error al intentar cargar la tarjeta:', error);
            throw new Error('Ocurrió un error al intentar actualizar la tarjeta.');
        }
    }
};
exports.UpdateCardService = UpdateCardService;
exports.UpdateCardService = UpdateCardService = __decorate([
    (0, common_1.Injectable)()
], UpdateCardService);
//# sourceMappingURL=update-card.service.js.map