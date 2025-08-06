// src/app/services/gallery.service.ts
// src/app/services/gallery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGalleryCard } from '../models/gallery-card'; // заменили
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<IGalleryCard[]> {
    return this.http.get<IGalleryCard[]>(`${environment.apiUrl}/cards`);
  }

  getCardById(id: string): Observable<IGalleryCard> {
    return this.http.get<IGalleryCard>(`${environment.apiUrl}/cards/${id}`);
  }
}
