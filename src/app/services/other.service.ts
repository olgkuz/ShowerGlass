import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IOther } from '../models/other';
import othersData from '../../assets/img/others/other.json'

@Injectable({ providedIn: 'root' })
export class OthersService {
  private readonly items: IOther[] = (othersData as { others: IOther[] }).others;

  getOthers(): Observable<IOther[]> {
    return of(this.items);
  }

  getOtherById(id: string): Observable<IOther | undefined> {
    const found = this.items.find(x => x.id === id);
    return of(found);
  }
}

