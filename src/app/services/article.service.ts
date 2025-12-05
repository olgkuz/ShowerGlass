import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
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
  private readonly localArticlesUrl = 'assets/articles/articles.json';
  private readonly isLikelyBlockedByCors =
    typeof window !== 'undefined' &&
    (() => {
      try {
        const apiOrigin = new URL(this.apiUrl).origin;
        return apiOrigin !== window.location.origin;
      } catch {
        return false;
      }
    })();

  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    if (this.isLikelyBlockedByCors) {
      return this.loadFromAssets();
    }

    return this.http.get<ArticlesResponse>(this.apiUrl).pipe(
      map((payload) => this.extractArticles(payload)),
      map((articles) => this.sortAndMap(articles)),
      catchError(() => this.loadFromAssets())
    );
  }

  getArticleById(id: string): Observable<IArticle> {
    if (this.isLikelyBlockedByCors) {
      return this.loadSingleFromAssets(id);
    }

    return this.http
      .get<ArticleDto>(API.articleById(id))
      .pipe(
        map((article) => this.mapArticle(article)),
        catchError(() => this.loadSingleFromAssets(id))
      );
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
    const doc = (dto as any)?._doc ?? dto;

    return {
      id: doc.id ?? dto.id ?? doc._id ?? dto._id ?? '',
      title: doc.title ?? dto.title ?? doc.name ?? dto.name ?? '',
      previewText:
        doc.previewText ??
        dto.previewText ??
        doc.description ??
        dto.description ??
        '',
      content: doc.content ?? dto.content ?? doc.description ?? dto.description ?? '',
      createdAt: doc.createdAt ?? dto.createdAt ?? new Date().toISOString(),
      readingTime: doc.readingTime ?? dto.readingTime ?? 0,
      tags: doc.tags ?? dto.tags ?? [],
    };
  }

  private sortAndMap(articles: ArticleDto[]): IArticle[] {
    return articles
      .map((article) => this.mapArticle(article))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  private loadFromAssets(): Observable<IArticle[]> {
    return this.http
      .get<{ articles: ArticleDto[] }>(this.localArticlesUrl)
      .pipe(
        map((resp) => this.sortAndMap(resp?.articles || [])),
        catchError(() => of([]))
      );
  }

  private loadSingleFromAssets(id: string): Observable<IArticle> {
    return this.loadFromAssets().pipe(
      map((list) => list.find((a) => a.id === String(id)) as IArticle)
    );
  }
}
