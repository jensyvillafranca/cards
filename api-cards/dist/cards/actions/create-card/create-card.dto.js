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
exports.CreateCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCardDto {
}
exports.CreateCardDto = CreateCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Titulo de la tarjeta',
        example: 'Tarjeta de ejemplo',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripciones de la tarjeta',
        example: ['Descripcion 1', 'Descripcion 2'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], CreateCardDto.prototype, "descriptions", void 0);
//# sourceMappingURL=create-card.dto.js.map