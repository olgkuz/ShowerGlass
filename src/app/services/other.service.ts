// src/app/services/other.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IOther } from '../models/other';

interface IOtherDto {
  id?: string;      // виртуал от mongoose
  _id?: string;     // на всякий
  name: string;
  img?: string;     // имя файла (когда используете assets)
  imgUrl?: string;  // виртуал URL, если картинка хранится на сервере
  description: string;
}

@Injectable({ providedIn: 'root' })
export class OthersService {
  private api = `${environment.apiUrl}/others`;

  constructor(private http: HttpClient) {}

  getOthers(): Observable<IOther[]> {
    return this.http.get<IOtherDto[]>(this.api).pipe(
      map(list => list.map(this.mapToClient))
    );
  }

  getOtherById(id: string): Observable<IOther | undefined> {
    return this.http.get<IOtherDto>(`${this.api}/${id}`).pipe(
      map(this.mapToClient)
    );
  }

  private mapToClient = (dto: IOtherDto): IOther => {
    const id = (dto.id || dto._id) ?? '';
    return {
      id,
      name: dto.name,
      description: dto.description,
      img: dto.img,        // если продолжаете хранить миниатюры в assets
      // при желании можно расширить модель IOther полем imgUrl и использовать серверные картинки
      // imgUrl: dto.imgUrl
    } as IOther;
  };
}

