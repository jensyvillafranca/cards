"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const logging_service_1 = require("../logs/logging.service");
const create_card_controller_1 = require("./actions/create-card/create-card.controller");
const read_card_controller_1 = require("./actions/read-card/read-card.controller");
const update_card_controller_1 = require("./actions/update-card/update-card.controller");
const delete_card_controller_1 = require("./actions/delete-card/delete-card.controller");
const create_card_service_1 = require("./actions/create-card/create-card.service");
const read_card_service_1 = require("./actions/read-card/read-card.service");
const update_card_service_1 = require("./actions/update-card/update-card.service");
const delete_card_service_1 = require("./actions/delete-card/delete-card.service");
let CardModule = class CardModule {
};
exports.CardModule = CardModule;
exports.CardModule = CardModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            create_card_controller_1.CreateCardController,
            read_card_controller_1.ReadCardController,
            update_card_controller_1.UpdateCardController,
            delete_card_controller_1.DeleteCardController,
        ],
        providers: [
            create_card_service_1.CreateCardService,
            read_card_service_1.ReadCardService,
            update_card_service_1.UpdateCardService,
            delete_card_service_1.DeleteCardService,
            logging_service_1.LoggingService,
        ],
    })
], CardModule);
//# sourceMappingURL=card.module.js.map