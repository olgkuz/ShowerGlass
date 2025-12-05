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
  private readonly localOthersUrl = 'assets/img/others/other.json';
  private readonly isLikelyBlockedByCors =
    typeof window !== 'undefined' &&
    (() => {
      try {
        const apiOrigin = new URL(this.api).origin;
        return apiOrigin !== window.location.origin;
      } catch {
        return false;
      }
    })();

  constructor(private http: HttpClient) {}

  getOthers(): Observable<IOther[]> {
    if (this.isLikelyBlockedByCors) {
      return this.loadFromAssets();
    }

    return this.http.get<OtherDto[]>(this.api).pipe(
      map((list) => this.mapList(list)),
      switchMap((items) =>
        items.length ? of(items) : this.fetchFromCards()
      ),
      catchError(() => this.fetchFromCards())
    );
  }

  getOtherById(id: string): Observable<IOther | undefined> {
    if (this.isLikelyBlockedByCors) {
      return this.loadSingleFromAssets(id);
    }

    return this.http.get<OtherDto>(`${this.api}/${id}`).pipe(
      map((dto) => this.mapToClient(dto)),
      switchMap((item) =>
        item
          ? of(item)
          : this.fetchSingleFromCards(id)
      ),
      catchError(() => this.fetchSingleFromCards(id))
    );
  }

  private fetchFromCards(): Observable<IOther[]> {
    return this.http
      .get<OtherDto[]>(this.cardsApi)
      .pipe(
        map((list) => this.mapList(list)),
        switchMap((items) =>
          items.length ? of(items) : this.loadFromAssets()
        ),
        catchError(() => this.loadFromAssets())
      );
  }

  private fetchSingleFromCards(id: string): Observable<IOther | undefined> {
    return this.http
      .get<OtherDto>(`${this.cardsApi}/${id}`)
      .pipe(
        map((dto) => this.mapToClient(dto)),
        switchMap((item) =>
          item ? of(item) : this.loadSingleFromAssets(id)
        ),
        catchError(() => this.loadSingleFromAssets(id))
      );
  }

  private loadFromAssets(): Observable<IOther[]> {
    return this.http
      .get<{ others: OtherDto[] }>(this.localOthersUrl)
      .pipe(
        map((resp) => this.mapList(resp?.others ?? [])),
        catchError(() => of([]))
      );
  }

  private loadSingleFromAssets(id: string): Observable<IOther | undefined> {
    return this.loadFromAssets().pipe(
      map((items) => items.find((o) => o.id === String(id)))
    );
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
    const idRaw = (doc as any).id ?? dto.id ?? (doc as any)._id ?? dto._id ?? '';
    const id = typeof idRaw === 'string' ? idRaw.trim() : String(idRaw || '').trim();
    const nameRaw = (doc as any).name ?? dto.name ?? '';
    const name = typeof nameRaw === 'string' ? nameRaw.trim() : String(nameRaw || '').trim();
    const descriptionRaw =
      (doc as any).description ?? dto.description ?? '';
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
  };
}
