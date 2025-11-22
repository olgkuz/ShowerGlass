import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IOther } from '../models/other';

type OtherDto = {
  id?: string;
  _id?: string;
  name?: string;
  img?: string;
  imgUrl?: string;
  description?: string;
  _doc?: Record<string, unknown>;
};

@Injectable({ providedIn: 'root' })
export class OthersService {
  private readonly api = `${environment.apiUrl}/others`;
  private readonly cardsApi = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) {}

  getOthers(): Observable<IOther[]> {
    return this.http.get<OtherDto[]>(this.api).pipe(
      map((list) => this.mapList(list)),
      switchMap((items) =>
        items.length ? of(items) : this.fetchFromCards()
      ),
      catchError(() => this.fetchFromCards())
    );
  }

  getOtherById(id: string): Observable<IOther | undefined> {
    return this.http.get<OtherDto>(`${this.api}/${id}`).pipe(
      map((dto) => this.mapToClient(dto)),
      switchMap((item) =>
        item
          ? of(item)
          : this.http
              .get<OtherDto>(`${this.cardsApi}/${id}`)
              .pipe(map((dto) => this.mapToClient(dto)))
      ),
      catchError(() =>
        this.http
          .get<OtherDto>(`${this.cardsApi}/${id}`)
          .pipe(map((dto) => this.mapToClient(dto)))
      )
    );
  }

  private fetchFromCards(): Observable<IOther[]> {
    return this.http
      .get<OtherDto[]>(this.cardsApi)
      .pipe(map((list) => this.mapList(list)));
  }

  private mapList(list: OtherDto[]): IOther[] {
    return Array.isArray(list)
      ? list
          .map((dto) => this.mapToClient(dto))
          .filter((o): o is IOther => Boolean(o && (o.id || o.name)))
      : [];
  }

  private mapToClient = (dto: OtherDto): IOther | null => {
    const doc = (dto as any)?._doc ?? dto;
    const id = (doc as any).id ?? dto.id ?? (doc as any)._id ?? dto._id ?? '';
    const name = (doc as any).name ?? dto.name ?? '';
    const description =
      (doc as any).description ?? dto.description ?? '';
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
  };
}
