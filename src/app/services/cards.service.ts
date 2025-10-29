// src/app/services/cards.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICards } from '../models/cards';

// Что реально приходит с бэка (TypeEntity)
interface ITypeDto {
  id?: string;        // виртуал от mongoose
  _id?: string;       // на всякий случай
  name: string;
  description: string;
  img?: string;
  imgUrl?: string;    // виртуал (если картинка загружена на сервер)
}

@Injectable({ providedIn: 'root' })
export class CardsService {
  private api = `${environment.apiUrl}/types`;

  constructor(private http: HttpClient) {}

  getCards(): Observable<ICards[]> {
    return this.http.get<ITypeDto[]>(this.api).pipe(
      map(list => list.map(this.mapToICard))
    );
  }

  getCardById(id: string): Observable<ICards | undefined> {
    return this.http.get<ITypeDto>(`${this.api}/${id}`).pipe(
      map(dto => this.mapToICard(dto))
    );
  }

  private mapToICard = (dto: ITypeDto): ICards => {
    const id = (dto.id || dto._id) ?? ''; // подстрахуемся
    // Если используете серверные картинки — берём imgUrl,
    // иначе оставляйте dto.img (имя файла из assets), как сейчас.
    return {
      id,
      name: dto.name,
      description: dto.description,
      img: dto.img,          // если продолжаете хранить в assets
      imgUrl: dto.imgUrl     // если хотите грузить с сервера
    } as ICards;
  };
}
