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
exports.ReadCardController = void 0;
const common_1 = require("@nestjs/common");
const read_card_service_1 = require("../read-card/read-card.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const transaction_interceptor_1 = require("../../../interceptors/transaction.interceptor");
let ReadCardController = class ReadCardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    async findAll(req) {
        const connection = req.connection;
        try {
            const result = await this.cardService.findAll(connection);
            return {
                message: 'tarjetas leídas exitosamente...',
                data: result,
            };
        }
        catch (error) {
            console.error('Error al obtener todas las tarjetas:', error);
            throw error;
        }
    }
    async findOne(id, req) {
        const connection = req.connection;
        try {
            const result = await this.cardService.findOne(+id, connection);
            if (!result) {
                return {
                    message: `no se encontro ninguna tarjeta con ${id}.`,
                };
            }
            return {
                message: 'tarjeta leída exitosamente...',
                data: result,
            };
        }
        catch (error) {
            console.error(`Error al obtener la tarjeta con ID ${id}:`, error);
            throw error;
        }
    }
};
exports.ReadCardController = ReadCardController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las tarjetas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todas las tarjetas.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReadCardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una tarjeta específica por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles de la tarjeta solicitada.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tarjeta no encontrada.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Identificador único de la tarjeta', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReadCardController.prototype, "findOne", null);
exports.ReadCardController = ReadCardController = __decorate([
    (0, swagger_1.ApiTags)('Tarjetas'),
    (0, common_1.Controller)('cards'),
    (0, common_2.UseInterceptors)(transaction_interceptor_1.TransactionInterceptor),
    __metadata("design:paramtypes", [read_card_service_1.ReadCardService])
], ReadCardController);
//# sourceMappingURL=read-card.controller.js.map