
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';
import { ICards } from '../models/cards';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http:HttpClient) { }

  getCards(): Observable<ICards[]> {
    return this.http.get<ICards[]>(API.cards);
  }
  
  getCardById(id: string): Observable<ICards> {
    const tourApi = API.card;
    return this.http.get<ICards>(`${tourApi}/${id}`);
  }

}
