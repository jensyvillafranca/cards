"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCardService = void 0;
const common_1 = require("@nestjs/common");
let DeleteCardService = class DeleteCardService {
    async remove(id, connection) {
        try {
            await connection('descriptions')
                .where('idCard', id)
                .del();
            await connection('cards')
                .where('idCard', id)
                .del();
            return { message: `La tarjeta con el ID ${id} y sus descripciones han sido eliminadas...` };
        }
        catch (error) {
            console.error('Error al eliminar la tarjeta:', error);
            throw new Error('ocurrió un error al intentar eliminar...');
        }
    }
};
exports.DeleteCardService = DeleteCardService;
exports.DeleteCardService = DeleteCardService = __decorate([
    (0, common_1.Injectable)()
], DeleteCardService);
//# sourceMappingURL=delete-card.service.js.map