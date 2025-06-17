import { Injectable } from '@angular/core';
import { IArticle } from '../models/article';

@Injectable({ providedIn: 'root' })
export class BlogService {
  searchArticles(articles: IArticle[], searchTerm: string): IArticle[] {
    const term = searchTerm.toLowerCase();
    return articles.filter(article =>
      (article.title && article.title.toLowerCase().includes(term)) ||
      (article.previewText && article.previewText.toLowerCase().includes(term)) ||
      (article.content && article.content.toLowerCase().includes(term)) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  }
}
