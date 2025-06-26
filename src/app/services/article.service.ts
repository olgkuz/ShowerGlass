import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../models/article';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this.apiUrl}?_sort=createdAt&_order=desc`);
  }

  getArticleById(id: string): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.apiUrl}/${id}`);
  }

  createArticle(article: Omit<IArticle, 'id' | 'createdAt'>): Observable<IArticle> {
    return this.http.post<IArticle>(this.apiUrl, article);
  }
}

