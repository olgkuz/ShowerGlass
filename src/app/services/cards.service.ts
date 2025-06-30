// services/cards.service.ts
import { Injectable } from '@angular/core';
import { ICards } from '../models/cards';
import cardsData from '../../assets/cards/'; // Путь к JSON

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private cards: ICards[] = cardsData.cards; // Загружаем данные из JSON

  getCards(): ICards[] {
    return this.cards; // Возвращаем массив напрямую
  }

  getCardById(id: string): ICards | undefined {
    return this.cards.find((card) => card.id === id); // Ищем карточку в массиве
  }
}

