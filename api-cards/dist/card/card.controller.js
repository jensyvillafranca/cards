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
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const card_service_1 = require("./card.service");
const createcard_dto_1 = require("./dto/createcard.dto");
const updatecard_dto_1 = require("./dto/updatecard.dto");
const swagger_1 = require("@nestjs/swagger");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    create(createCardDto) {
        return this.cardService.create(createCardDto);
    }
    findAll() {
        return this.cardService.findAll();
    }
    findOne(id) {
        return this.cardService.findOne(+id);
    }
    update(id, updateCardDto) {
        return this.cardService.update(+id, updateCardDto);
    }
    remove(id) {
        return this.cardService.remove(+id);
    }
};
exports.CardController = CardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva tarjeta' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tarjeta creada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada no válidos.' }),
    (0, swagger_1.ApiBody)({ description: 'Cuerpo de la solicitud para crear una tarjeta', type: createcard_dto_1.CreateCardDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createcard_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las tarjetas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todas las tarjetas.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una tarjeta específica por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles de la tarjeta solicitada.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tarjeta no encontrada.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Identificador único de la tarjeta', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una tarjeta específica por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tarjeta actualizada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tarjeta no encontrada.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada no válidos.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Identificador único de la tarjeta', type: Number }),
    (0, swagger_1.ApiBody)({ description: 'Cuerpo de la solicitud para actualizar la tarjeta', type: updatecard_dto_1.UpdateCardDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatecard_dto_1.UpdateCardDto]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una tarjeta específica por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tarjeta eliminada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tarjeta no encontrada.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Identificador único de la tarjeta', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "remove", null);
exports.CardController = CardController = __decorate([
    (0, swagger_1.ApiTags)('Tarjetas'),
    (0, common_1.Controller)('cards'),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
//# sourceMappingURL=card.controller.js.map