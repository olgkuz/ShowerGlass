// src/app/services/cards.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { ICards } from '../models/cards';

type CardDto = {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
  img?: string;
  imgUrl?: string;
  _doc?: Record<string, unknown>;
};

@Injectable({ providedIn: 'root' })
export class CardsService {
  private readonly typesApi = `${environment.apiUrl}/types`;
  private readonly cardsApi = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) {}

  getCards(): Observable<ICards[]> {
    return this.http.get<CardDto[]>(this.typesApi).pipe(
      map((list) => this.mapList(list)),
      switchMap((cards) =>
        cards.length ? of(cards) : this.fetchFromCardsEndpoint()
      ),
      catchError(() => this.fetchFromCardsEndpoint())
    );
  }

  getCardById(id: string): Observable<ICards | undefined> {
    return this.http.get<CardDto>(`${this.typesApi}/${id}`).pipe(
      map((dto) => this.mapToICard(dto)),
      switchMap((card) =>
        card ? of(card) : this.http.get<CardDto>(`${this.cardsApi}/${id}`).pipe(map((c) => this.mapToICard(c)))
      ),
      catchError(() =>
        this.http
          .get<CardDto>(`${this.cardsApi}/${id}`)
          .pipe(map((c) => this.mapToICard(c)))
      )
    );
  }

  private fetchFromCardsEndpoint(): Observable<ICards[]> {
    return this.http
      .get<CardDto[]>(this.cardsApi)
      .pipe(map((list) => this.mapList(list)));
  }

  private mapList(list: CardDto[]): ICards[] {
    return Array.isArray(list)
      ? list
          .map((dto) => this.mapToICard(dto))
          .filter((c): c is ICards => Boolean(c && (c.id || c.name)))
      : [];
  }

  private mapToICard(dto: CardDto): ICards | null {
    const doc = (dto as any)?._doc ?? dto;
    const id = (doc as any).id ?? dto.id ?? (doc as any)._id ?? dto._id ?? '';
    const name = (doc as any).name ?? dto.name ?? '';
    const description = (doc as any).description ?? dto.description ?? '';
    const file = (doc as any).img ?? dto.img ?? '';
    const uploadsBase = environment.apiUrl.replace(/\/api$/, '/uploads');

    return {
      id,
      name,
      description,
      img: file,
      imgUrl:
        (doc as any).imgUrl ??
        dto.imgUrl ??
        (file ? `${uploadsBase}/${file}` : undefined),
    };
  }
}
