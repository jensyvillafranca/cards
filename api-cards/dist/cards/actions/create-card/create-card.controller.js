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
exports.CreateCardController = void 0;
const common_1 = require("@nestjs/common");
const create_card_service_1 = require("./create-card.service");
const create_card_dto_1 = require("./create-card.dto");
const swagger_1 = require("@nestjs/swagger");
const logging_service_1 = require("../../../logs/logging.service");
const common_2 = require("@nestjs/common");
const transaction_interceptor_1 = require("../../../interceptors/transaction.interceptor");
let CreateCardController = class CreateCardController {
    constructor(cardService, loggingService) {
        this.cardService = cardService;
        this.loggingService = loggingService;
    }
    async create(createCardDto, req) {
        const connection = req.connection;
        try {
            this.loggingService.log('INSERTAR', `Se creó tarjeta con el título: ${createCardDto.title}`);
            const result = await this.cardService.create(createCardDto, connection);
            return {
                message: 'tarjeta creada exitosamente...',
                data: result,
            };
        }
        catch (error) {
            console.error('Error al crear tarjeta:', error);
            throw error;
        }
    }
};
exports.CreateCardController = CreateCardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva tarjeta' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tarjeta creada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada no válidos.' }),
    (0, swagger_1.ApiBody)({ description: 'Cuerpo de la solicitud para crear una tarjeta', type: create_card_dto_1.CreateCardDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_card_dto_1.CreateCardDto, Object]),
    __metadata("design:returntype", Promise)
], CreateCardController.prototype, "create", null);
exports.CreateCardController = CreateCardController = __decorate([
    (0, swagger_1.ApiTags)('Tarjetas'),
    (0, common_1.Controller)('cards'),
    (0, common_2.UseInterceptors)(transaction_interceptor_1.TransactionInterceptor),
    __metadata("design:paramtypes", [create_card_service_1.CreateCardService,
        logging_service_1.LoggingService])
], CreateCardController);
//# sourceMappingURL=create-card.controller.js.map