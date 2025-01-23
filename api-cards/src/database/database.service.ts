import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {

  private pool: mysql.Pool;

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
      queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
    });
    console.log('Conexión a la base de datos establecida');
  }

  async getConnection(): Promise<mysql.PoolConnection> {
    return this.pool.getConnection(); 
  }

  async query(query: string, params: any[] = []): Promise<any> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async transaction(callback: (connection: mysql.PoolConnection) => Promise<any>): Promise<any> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch(error){
      await connection.rollback();
      console.log("Error en la transacción: ", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Pool de conexión cerrado');
  }
}
