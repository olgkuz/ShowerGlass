// services/cards.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICards } from '../models/cards';
import cardsData from '../../assets/img/cards/cards.json';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private cards: ICards[] = cardsData.cards;

  getCards(): Observable<ICards[]> {
    return of(this.cards); // Возвращаем Observable
  }

  getCardById(id: string): Observable<ICards | undefined> {
    const card = this.cards.find(c => c.id === id);
    return of(card); // Возвращаем Observable
  }
}