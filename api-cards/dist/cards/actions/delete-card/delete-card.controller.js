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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCardController = void 0;
const common_1 = require("@nestjs/common");
const delete_card_service_1 = require("../delete-card/delete-card.service");
const swagger_1 = require("@nestjs/swagger");
const logging_service_1 = require("../../../logs/logging.service");
const common_2 = require("@nestjs/common");
const transaction_interceptor_1 = require("../../../interceptors/transaction.interceptor");
let DeleteCardController = class DeleteCardController {
    constructor(cardService, loggingService) {
        this.cardService = cardService;
        this.loggingService = loggingService;
    }
    async remove(id, req) {
        const connection = req.connection;
        try {
            this.loggingService.log('ELIMINAR', `Se eliminó la tarjeta con el ID: ${id}`);
            const result = await this.cardService.remove(+id, connection);
            return {
                message: 'tarjeta eliminada exitosamente...',
                data: result,
            };
        }
        catch (error) {
            console.error('Error al eliminar tarjeta:', error);
            throw error;
        }
    }
};
exports.DeleteCardController = DeleteCardController;
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una tarjeta específica por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tarjeta eliminada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tarjeta no encontrada.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Identificador único de la tarjeta', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeleteCardController.prototype, "remove", null);
exports.DeleteCardController = DeleteCardController = __decorate([
    (0, swagger_1.ApiTags)('Tarjetas'),
    (0, common_1.Controller)('cards'),
    (0, common_2.UseInterceptors)(transaction_interceptor_1.TransactionInterceptor),
    __metadata("design:paramtypes", [delete_card_service_1.DeleteCardService,
        logging_service_1.LoggingService])
], DeleteCardController);
//# sourceMappingURL=delete-card.controller.js.map