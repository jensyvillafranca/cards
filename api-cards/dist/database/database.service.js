"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const dotenv = require("dotenv");
dotenv.config();
let DatabaseService = class DatabaseService {
    async onModuleInit() {
        this.knexInstance = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: Number(process.env.DB_PORT) || 3306,
            },
            pool: {
                min: Number(process.env.DB_POOL_MIN) || 2,
                max: Number(process.env.DB_POOL_MAX) || 10,
            },
        });
        console.log('Conexión a la base de datos establecida con Knex');
    }
    getKnexInstance() {
        return this.knexInstance;
    }
    async query(tableName, conditions = {}) {
        try {
            const result = await this.knexInstance(tableName).where(conditions).select();
            return result;
        }
        catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw error;
        }
    }
    async transaction(callback) {
        return this.knexInstance.transaction(async (trx) => {
            try {
                const result = await callback(trx);
                await trx.commit();
                return result;
            }
            catch (error) {
                await trx.rollback();
                console.error('Error en la transacción:', error);
                throw error;
            }
        });
    }
    async onModuleDestroy() {
        await this.knexInstance.destroy();
        console.log('Conexiones cerradas y Knex destruido');
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map