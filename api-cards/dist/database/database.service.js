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
const mysql = require("mysql2/promise");
let DatabaseService = class DatabaseService {
    async onModuleInit() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bdcards',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    async query(query, params = []) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(query, params);
            return rows;
        }
        catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw error;
        }
        finally {
            connection.release();
        }
    }
    async transaction(callback) {
        const connection = await this.pool.getConnection();
        try {
            await connection.beginTransaction();
            const result = await callback(connection);
            await connection.commit();
            return result;
        }
        catch (error) {
            await connection.rollback();
            console.log("Error en la trasacción: ", error);
            throw error;
        }
        finally {
            connection.release();
        }
    }
    async onModuleDestroy() {
        await this.pool.end();
        console.log('Pool de conexión cerrado');
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map