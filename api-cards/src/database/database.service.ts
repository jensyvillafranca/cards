import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import knex, { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private knexInstance: Knex;

  async onModuleInit() {
    this.knexInstance = knex({
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

  getKnexInstance(): Knex {
    return this.knexInstance;
  }

  async query(tableName: string, conditions: any = {}): Promise<any> {
    try {
      const result = await this.knexInstance(tableName).where(conditions).select();
      return result;
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw error;
    }
  }

  async transaction<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    return this.knexInstance.transaction(async (trx) => {
      try {
        const result = await callback(trx);
        await trx.commit();
        return result;
      } catch (error) {
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
}
