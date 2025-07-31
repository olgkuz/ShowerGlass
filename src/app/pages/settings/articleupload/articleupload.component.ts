
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ArticleService } from '../../../services/article.service';
import { IArticle } from '../../../models/article';


@Component({
  selector: 'app-articleupload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './articleupload.component.html',
  styleUrls: ['./articleupload.component.scss']
})
export class ArticleuploadComponent {
  articleForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      previewText: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      tags: [''] 
    });
  }

submitArticle() {
  if (this.articleForm.invalid) return;

  const formValues = this.articleForm.value;

const newArticle: Omit<IArticle, 'id' | 'createdAt'> = {
  title: formValues.title,
  previewText: formValues.previewText,
  content: formValues.content,
  readingTime: this.calculateReadingTime(formValues.content),
  tags: formValues.tags
    ? formValues.tags.split(',').map((tag: string) => tag.trim())
    : [],
};


  this.isSubmitting = true;

  this.articleService.createArticle(newArticle).subscribe({
    next: (res) => {
      this.isSubmitting = false;
      this.articleForm.reset();
      console.log(' Статья успешно создана:', res);
    },
    error: (err) => {
      this.isSubmitting = false;
      console.error(' Ошибка при создании статьи:', err);
    }
  });
}

private calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

}