import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { IGalleryCard } from '../models/gallery-card';
import { environment } from '../../environments/environment';

type GalleryCardDto = {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
  img?: string;
  imgUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  _doc?: Record<string, unknown>;
};

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly apiUrl = `${environment.apiUrl}/cards`;
  private readonly localCardsUrl = 'assets/img/cards/cards.json';
  private readonly isLikelyBlockedByCors =
    typeof window !== 'undefined' &&
    (() => {
      try {
        return new URL(this.apiUrl).origin !== window.location.origin;
      } catch {
        return false;
      }
    })();

  constructor(private http: HttpClient) {}

  getCards(): Observable<IGalleryCard[]> {
    if (this.isLikelyBlockedByCors) {
      return this.loadFromAssets();
    }

    return this.http.get<GalleryCardDto[]>(this.apiUrl).pipe(
      map((cards) => cards.map((c) => this.mapCard(c))),
      catchError(() => this.loadFromAssets())
    );
  }

  getCardById(id: string): Observable<IGalleryCard> {
    if (this.isLikelyBlockedByCors) {
      return this.loadSingleFromAssets(id);
    }

    return this.http
      .get<GalleryCardDto>(`${this.apiUrl}/${id}`)
      .pipe(
        map((card) => this.mapCard(card)),
        catchError(() => this.loadSingleFromAssets(id))
      );
  }

  private mapCard(dto: GalleryCardDto): IGalleryCard {
    const doc = (dto as any)?._doc ?? dto;
    const file = (doc as any).img ?? dto.img ?? '';
    const uploadsBase = environment.apiUrl.replace(/\/api$/, '/uploads');

    return {
      id: (doc as any).id ?? dto.id ?? (doc as any)._id ?? dto._id ?? '',
      name: (doc as any).name ?? dto.name ?? '',
      description: (doc as any).description ?? dto.description ?? '',
      img: file,
      imgUrl:
        (doc as any).imgUrl ??
        dto.imgUrl ??
        (file ? `${uploadsBase}/${file}` : undefined),
    };
  }

  private loadFromAssets(): Observable<IGalleryCard[]> {
    return this.http
      .get<{ cards: GalleryCardDto[] }>(this.localCardsUrl)
      .pipe(
        map((resp) => (resp?.cards || []).map((c) => this.mapCard(c))),
        catchError(() => of([]))
      );
  }

  private loadSingleFromAssets(id: string): Observable<IGalleryCard> {
    return this.loadFromAssets().pipe(
      map((cards) => cards.find((c) => c.id === String(id)) as IGalleryCard)
    );
  }
}
