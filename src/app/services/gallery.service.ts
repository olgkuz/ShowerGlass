import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of, switchMap } from 'rxjs';
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
  private readonly cardsApi = `${environment.apiUrl}/cards`;
  private readonly localCardsUrl = 'assets/img/cards/cards.json';
  private readonly localGalleryUrl = 'assets/gallery/gallery.json';
  private readonly isLikelyBlockedByCors =
    typeof window !== 'undefined' &&
    (() => {
      try {
        const apiOrigin = new URL(this.cardsApi).origin;
        return apiOrigin !== window.location.origin;
      } catch {
        return false;
      }
    })();

  constructor(private http: HttpClient) {}

  getCards(): Observable<IGalleryCard[]> {
    return this.loadFromGalleryAssets().pipe(
      switchMap((local) => {
        if (local.length || this.isLikelyBlockedByCors) {
          return of(local);
        }

        return this.http
          .get<GalleryCardDto[]>(this.cardsApi)
          .pipe(
            map((cards) => cards.map((c) => this.mapCard(c))),
            catchError(() => of(local))
          );
      })
    );
  }

  getCardById(id: string): Observable<IGalleryCard> {
    return this.loadSingleFromGalleryAssets(id).pipe(
      switchMap((local) => {
        if (local || this.isLikelyBlockedByCors) {
          return of(local as IGalleryCard);
        }

        return this.http
          .get<GalleryCardDto>(`${this.cardsApi}/${id}`)
          .pipe(
            map((card) => this.mapCard(card)),
            catchError(() => this.loadSingleFromGalleryAssets(id))
          );
      })
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

  /** Оригинальные промо-фото для галереи */
  private loadFromGalleryAssets(): Observable<IGalleryCard[]> {
    return this.http.get<{ items: GalleryCardDto[] }>(this.localGalleryUrl).pipe(
      map((resp) => (resp?.items || []).map((c) => this.mapCard(c))),
      catchError(() => this.loadFromCardsAssets())
    );
  }

  private loadFromCardsAssets(): Observable<IGalleryCard[]> {
    return this.http
      .get<{ cards: GalleryCardDto[] }>(this.localCardsUrl)
      .pipe(
        map((resp) => (resp?.cards || []).map((c) => this.mapCard(c))),
        catchError(() => of([]))
      );
  }

  private loadSingleFromGalleryAssets(id: string): Observable<IGalleryCard> {
    return this.loadFromGalleryAssets().pipe(
      map((cards) => cards.find((c) => c.id === String(id)) as IGalleryCard)
    );
  }
}
