import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

  getCards(): Observable<IGalleryCard[]> {
    return this.http
      .get<GalleryCardDto[]>(`${environment.apiUrl}/cards`)
      .pipe(map((cards) => cards.map((c) => this.mapCard(c))));
  }

  getCardById(id: string): Observable<IGalleryCard> {
    return this.http
      .get<GalleryCardDto>(`${environment.apiUrl}/cards/${id}`)
      .pipe(map((card) => this.mapCard(card)));
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
}
