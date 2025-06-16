import { Injectable } from '@angular/core';
import { IArticle } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  searchArticles(articles: IArticle[], value: string): IArticle[] {
    if (!Array.isArray(articles)) return [];
    if (!value) return articles;

    const searchTerm = value.toLowerCase();
    
    return articles.filter(article => {
      // Поиск по заголовку, превью и полному тексту
      return (
        (article.title && article.title.toLowerCase().includes(searchTerm)) ||
        (article.previewText && article.previewText.toLowerCase().includes(searchTerm)) ||
        (article.content && article.content.toLowerCase().includes(searchTerm)) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    });
  }

  
}