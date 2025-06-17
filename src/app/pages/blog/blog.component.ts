import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { IArticle } from '../../models/article';
import { BlogService } from '../../services/blog.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ArticleService } from '../../services/Article.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, InputTextModule, CardModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  searchQuery: string = '';
  searchSubject = new Subject<string>();

  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];

  constructor(
    private articleService: ArticleService,
    private blogService: BlogService
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => this.performSearch(searchTerm));
  }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.filteredArticles = [...articles];
    });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  performSearch(searchTerm: string): void {
    this.filteredArticles = this.blogService.searchArticles(this.articles, searchTerm);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }
}
