import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CardsService {
  constructor(private readonly db: DatabaseService) {}

  async createCard(title: string, descriptions: string[], createdAt: string) {
    const result = await this.db.query(
      'INSERT INTO cards (title, descriptions, created_at) VALUES (?, ?, ?)',
      [title, JSON.stringify(descriptions), createdAt],
    );
    return result;
  }

  async getCards() {
    return this.db.query('SELECT * FROM cards');
  }

  async getCardById(id: number) {
    return this.db.query('SELECT * FROM cards WHERE id = ?', [id]);
  }

  async updateCard(id: number, title: string, descriptions: string[]) {
    const result = await this.db.query(
      'UPDATE cards SET title = ?, descriptions = ? WHERE id = ?',
      [title, JSON.stringify(descriptions), id],
    );
    return result;
  }

  async deleteCard(id: number) {
    return this.db.query('DELETE FROM cards WHERE id = ?', [id]);
  }
}
