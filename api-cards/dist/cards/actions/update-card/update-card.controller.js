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
exports.UpdateCardController = void 0;
const common_1 = require("@nestjs/common");
const update_card_service_1 = require("../update-card/update-card.service");
const update_card_dto_1 = require("../update-card/update-card.dto");
const swagger_1 = require("@nestjs/swagger");
const logging_service_1 = require("../../../logs/logging.service");
const common_2 = require("@nestjs/common");
const transaction_interceptor_1 = require("../../../interceptors/transaction.interceptor");
let UpdateCardController = class UpdateCardController {
    constructor(cardService, loggingService) {
        this.cardService = cardService;
        this.loggingService = loggingService;
    }
    async update(id, updateCardDto, req) {
        const connection = req.connection;
        try {
            this.loggingService.log('ACTUALIZAR', `Se actualizó la tarjeta con el ID: ${id}`);
            const result = await this.cardService.update(+id, updateCardDto, connection);
            return {
                message: 'tarjeta actualizada exitosamente...',
                data: result,
            };
        }
        catch (error) {
            console.error('Error al actualizar tarjeta:', error);
            throw error;
        }
    }
};
exports.UpdateCardController = UpdateCardController;
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una tarjeta específica por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tarjeta actualizada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tarjeta no encontrada.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada no válidos.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Identificador único de la tarjeta', type: Number }),
    (0, swagger_1.ApiBody)({ description: 'Cuerpo de la solicitud para actualizar la tarjeta', type: update_card_dto_1.UpdateCardDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_card_dto_1.UpdateCardDto, Object]),
    __metadata("design:returntype", Promise)
], UpdateCardController.prototype, "update", null);
exports.UpdateCardController = UpdateCardController = __decorate([
    (0, swagger_1.ApiTags)('Tarjetas'),
    (0, common_1.Controller)('cards'),
    (0, common_2.UseInterceptors)(transaction_interceptor_1.TransactionInterceptor),
    __metadata("design:paramtypes", [update_card_service_1.UpdateCardService,
        logging_service_1.LoggingService])
], UpdateCardController);
//# sourceMappingURL=update-card.controller.js.map