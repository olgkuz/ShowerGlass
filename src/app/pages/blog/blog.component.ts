import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { debounceTime, distinctUntilChanged, Subject, catchError, of } from 'rxjs';

import { IArticle } from '../../models/article';
import { BlogService } from '../../services/blog.service';
import { ArticleService } from '../../services/article.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  searchQuery = '';
  private searchSubject = new Subject<string>();

  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];

  isLoading = false;
  error: string | null = null;

  /** состояние раскрытия только по клику */
  private expanded = new Set<string>();

  constructor(
    private articleService: ArticleService,
    private blogService: BlogService,
    private messageService: MessageService
  ) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => this.performSearch(searchTerm));
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.error = null;

    this.articleService
      .getArticles()
      .pipe(
        catchError((err) => {
          this.error = 'Не удалось загрузить статьи';
          this.showError(this.error);
          return of([] as IArticle[]);
        })
      )
      .subscribe((articles) => {
        this.articles = articles.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.filteredArticles = [...this.articles];
        this.isLoading = false;
        this.expanded.clear();
      });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  performSearch(searchTerm: string): void {
    this.filteredArticles = this.blogService.searchArticles(
      this.articles,
      searchTerm
    );
    this.expanded.clear(); // после поиска все карточки свернуты
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
      life: 3000,
    });
  }

  toggleExpand(id: string): void {
    if (this.expanded.has(id)) this.expanded.delete(id);
    else this.expanded.add(id);
  }

  isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  trackById(_: number, a: IArticle): string {
    return a.id;
  }
}
