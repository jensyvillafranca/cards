import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {

  // private connection: mysql.Connection;
  private pool: mysql.Pool;

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
    // console.log('Conexión a la base de datos establecidaPoo');
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
      console.log("Error en la trasacción: ", error);
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