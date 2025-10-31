import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IOther } from '../models/other';

interface IOtherDto {
  id?: string;
  _id?: string;
  name: string;
  img?: string;
  imgUrl?: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class OthersService {
  private readonly api = `${environment.apiUrl}/others`;

  constructor(private http: HttpClient) {}

  getOthers(): Observable<IOther[]> {
    return this.http.get<IOtherDto[]>(this.api).pipe(
      map((list) => list.map(this.mapToClient))
    );
  }

  getOtherById(id: string): Observable<IOther | undefined> {
    return this.http.get<IOtherDto>(`${this.api}/${id}`).pipe(
      map(this.mapToClient)
    );
  }

  private mapToClient = (dto: IOtherDto): IOther => {
    const id = dto.id ?? dto._id ?? '';
    return {
      id,
      name: dto.name,
      description: dto.description,
      img: dto.img ?? '',
      imgUrl: dto.imgUrl
    };
  };
}

