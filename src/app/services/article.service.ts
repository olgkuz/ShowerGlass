import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IArticle } from '../models/article';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';

interface ArticleDto {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  previewText?: string;
  description?: string;
  content?: string;
  createdAt?: string;
  readingTime?: number;
  tags?: string[];
}

type ArticlesResponse = ArticleDto[] | { articles?: ArticleDto[] };

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly apiUrl = API.articles;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    return this.http.get<ArticlesResponse>(this.apiUrl).pipe(
      map((payload) => this.extractArticles(payload)),
      map((articles) =>
        articles
          .map((article) => this.mapArticle(article))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
      )
    );
  }

  getArticleById(id: string): Observable<IArticle> {
    return this.http
      .get<ArticleDto>(API.articleById(id))
      .pipe(map((article) => this.mapArticle(article)));
  }

  createArticle(
    article: Omit<IArticle, 'id' | 'createdAt'>
  ): Observable<IArticle> {
    return this.http
      .post<ArticleDto>(this.apiUrl, article)
      .pipe(map((articleDto) => this.mapArticle(articleDto)));
  }

  private extractArticles(payload: ArticlesResponse): ArticleDto[] {
    if (Array.isArray(payload)) {
      return payload;
    }

    return Array.isArray(payload?.articles) ? payload.articles : [];
  }

  private mapArticle(dto: ArticleDto): IArticle {
    return {
      id: dto.id ?? dto._id ?? '',
      title: dto.title ?? dto.name ?? '',
      previewText: dto.previewText ?? dto.description ?? '',
      content: dto.content ?? dto.description ?? '',
      createdAt: dto.createdAt ?? new Date().toISOString(),
      readingTime: dto.readingTime ?? 0,
      tags: dto.tags ?? [],
    };
  }
}
