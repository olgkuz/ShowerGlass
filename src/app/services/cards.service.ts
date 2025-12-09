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
  private readonly localCardsUrl = 'assets/img/cards/cards.json';
  private readonly isLikelyBlockedByCors =
    typeof window !== 'undefined' &&
    (() => {
      try {
        const apiOrigin = new URL(this.typesApi).origin;
        return apiOrigin !== window.location.origin;
      } catch {
        return false;
      }
    })();

  constructor(private http: HttpClient) {}

  getCards(): Observable<ICards[]> {
    if (this.isLikelyBlockedByCors) {
      return this.loadFromAssets();
    }

    return this.http.get<CardDto[]>(this.typesApi).pipe(
      map((list) => this.mapList(list)),
      switchMap((cards) =>
        cards.length ? of(cards) : this.loadFromAssets()
      ),
      catchError(() => this.loadFromAssets())
    );
  }

  getCardById(id: string): Observable<ICards | undefined> {
    // IDs like "1", "2" belong to the static cards.json; API expects Mongo ObjectId.
    if (this.isLikelyBlockedByCors || !this.isMongoObjectId(id)) {
      return this.loadSingleFromAssets(id);
    }

    return this.http.get<CardDto>(`${this.typesApi}/${id}`).pipe(
      map((dto) => this.mapToICard(dto)),
      switchMap((card) => (card ? of(card) : this.loadSingleFromAssets(id))),
      catchError(() => this.loadSingleFromAssets(id))
    );
  }

  private loadFromAssets(): Observable<ICards[]> {
    return this.http
      .get<{ cards: CardDto[] }>(this.localCardsUrl)
      .pipe(
        map((resp) => this.mapList(resp?.cards ?? [])),
        catchError(() => of([]))
      );
  }

  private loadSingleFromAssets(id: string): Observable<ICards | undefined> {
    return this.loadFromAssets().pipe(
      map((cards) => cards.find((c) => c.id === String(id)))
    );
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
    const idRaw = (doc as any).id ?? dto.id ?? (doc as any)._id ?? dto._id ?? '';
    const id = typeof idRaw === 'string' ? idRaw.trim() : String(idRaw || '').trim();
    const nameRaw = (doc as any).name ?? dto.name ?? '';
    const name = typeof nameRaw === 'string' ? nameRaw.trim() : String(nameRaw || '').trim();
    const descriptionRaw = (doc as any).description ?? dto.description ?? '';
    const description =
      typeof descriptionRaw === 'string'
        ? descriptionRaw
        : String(descriptionRaw || '');
    const file = ((doc as any).img ?? dto.img ?? '').trim();
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

  private isMongoObjectId(value: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(value.trim());
  }
}
