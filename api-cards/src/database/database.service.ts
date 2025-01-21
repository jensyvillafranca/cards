import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bdcards',
    });
    console.log('Conexión a la base de datos establecida');
  }

  async query(query: string, params: any[] = []): Promise<any> {
    try {
      const [rows] = await this.connection.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.connection.end();
    console.log('Conexión a la base de datos cerrada');
  }
}