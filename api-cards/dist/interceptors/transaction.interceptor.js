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
exports.TransactionInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const database_service_1 = require("../database/database.service");
let TransactionInterceptor = class TransactionInterceptor {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async intercept(context, next) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const connection = await this.databaseService.getConnection();
        await connection.beginTransaction();
        console.log('Transacción iniciada');
        request.connection = connection;
        return next.handle().pipe((0, operators_1.tap)(async () => {
            await connection.commit();
            console.log('Transacción confirmada (commit)');
            connection.release();
        }), (0, operators_1.catchError)(async (error) => {
            await connection.rollback();
            console.error('Transacción revertida (rollback) debido a un error:', error);
            connection.release();
            throw error;
        }));
    }
};
exports.TransactionInterceptor = TransactionInterceptor;
exports.TransactionInterceptor = TransactionInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TransactionInterceptor);
//# sourceMappingURL=transaction.interceptor.js.map