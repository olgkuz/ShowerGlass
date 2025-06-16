import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { IArticle } from '../../models/article';
import { BlogService } from '../../services/blog.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, InputTextModule, CardModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  searchQuery: string = '';
  searchSubject = new Subject<string>();
  
  articles: IArticle[] = [];
  articlesStore: IArticle[] = [];
  filteredArticles: IArticle[] = [];

  constructor(private blogService: BlogService) {
    // Инициализация с debounce для поиска (300мс)
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void {
    // Загрузка статей (пример)
    this.articlesStore = this.getMockArticles();
    this.filteredArticles = [...this.articlesStore];
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  performSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredArticles = [...this.articlesStore];
      return;
    }

    this.filteredArticles = this.blogService.searchArticles(this.articlesStore, searchTerm);
  }

  getMockArticles(): IArticle[] {
    return [
      {
        id: '1',
        title: 'Основы дизайна интерьера',
        content: 'Полное руководство по основам дизайна интерьера. Включает цветовые схемы, расстановку мебели и выбор материалов...',
        previewText: 'В этой статье мы рассмотрим базовые принципы создания гармоничного интерьера...',
        createdAt: new Date('2023-10-15'),
        readingTime: 5,
        tags: ['дизайн', 'интерьер', 'базовые принципы']
      },
      // ... другие статьи
    ];
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU');
  }
}