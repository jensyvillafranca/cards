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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CardDescriptionDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID de la descripción',
        example: 1,
    }),
    __metadata("design:type", Number)
], CardDescriptionDto.prototype, "idDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Texto de la descripción',
        example: 'Nueva descripción',
    }),
    __metadata("design:type", String)
], CardDescriptionDto.prototype, "description", void 0);
class UpdateCardDto {
}
exports.UpdateCardDto = UpdateCardDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Título actualizado de la tarjeta',
        example: 'Nuevo Título',
    }),
    __metadata("design:type", String)
], UpdateCardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lista de descripciones de la tarjeta',
        example: [
            { idDescription: 1, description: 'Nueva descripción 1' },
            { idDescription: 2, description: 'Nueva descripción 2' },
        ],
        type: [CardDescriptionDto],
    }),
    __metadata("design:type", Array)
], UpdateCardDto.prototype, "descriptions", void 0);
//# sourceMappingURL=update-card.dto.js.map