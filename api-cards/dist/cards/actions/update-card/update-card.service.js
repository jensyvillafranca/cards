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
        if (title) {
            const queryUpdateCard = `UPDATE cards SET titleCard = ? WHERE idCard = ?`;
            await connection.execute(queryUpdateCard, [title, id]);
        }
        if (descriptions && descriptions.length > 0) {
            const existingDescriptionsQuery = `SELECT idDescription FROM descriptions WHERE idCard = ?`;
            const [existingDescriptions] = await connection.execute(existingDescriptionsQuery, [id]);
            const existingIds = existingDescriptions.map((desc) => desc.idDescription);
            const idsToKeep = [];
            for (const desc of descriptions) {
                const { idDescription, description } = desc;
                if (idDescription && existingIds.includes(idDescription)) {
                    const queryUpdateDescription = `
            UPDATE descriptions 
            SET description = ? 
            WHERE idDescription = ? AND idCard = ?
          `;
                    await connection.execute(queryUpdateDescription, [description, idDescription, id]);
                    idsToKeep.push(idDescription);
                }
                else if (!idDescription) {
                    const queryInsertDescription = `
            INSERT INTO descriptions (description, idCard) 
            VALUES (?, ?)
          `;
                    const [result] = await connection.execute(queryInsertDescription, [description, id]);
                    idsToKeep.push(result.insertId);
                }
            }
            const idsToDelete = existingIds.filter((id) => !idsToKeep.includes(id));
            if (idsToDelete.length > 0) {
                const queryDeleteDescriptions = `DELETE FROM descriptions WHERE idDescription IN (?)`;
                await connection.execute(queryDeleteDescriptions, [idsToDelete]);
            }
        }
        return {
            id,
            title,
            descriptions,
            message: 'Tarjeta actualizada exitosamente.',
        };
    }
};
exports.UpdateCardService = UpdateCardService;
exports.UpdateCardService = UpdateCardService = __decorate([
    (0, common_1.Injectable)()
], UpdateCardService);
//# sourceMappingURL=update-card.service.js.map