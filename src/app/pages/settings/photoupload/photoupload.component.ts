import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photoupload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.scss']
})
export class PhotouploadComponent {
  cardForm: FormGroup;
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  uploadedImageUrl: string | null = null;
  uploadedImageId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadCard(): void {
    if (!this.cardForm.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.cardForm.get('name')?.value);
    formData.append('description', this.cardForm.get('description')?.value);
    formData.append('img', this.selectedFile);

    this.http.post<any>(`${environment.apiUrl}/cards/upload`, formData).subscribe({
      next: (res) => {
        console.log('✅ Успешно загружено:', res);
        this.uploadedImageUrl = `${environment.apiUrl}/public/${res.img}`;
        this.uploadedImageId = res.id;
        this.cardForm.reset();
        this.selectedFile = null;
        this.imagePreviewUrl = null;
      },
      error: (err) => {
        console.error('❌ Ошибка загрузки:', err);
      }
    });
  }

  deleteImage(): void {
    if (!this.uploadedImageId) return;

    this.http.delete(`${environment.apiUrl}/cards/${this.uploadedImageId}`).subscribe({
      next: () => {
        console.log('🗑️ Удалено успешно');
        this.uploadedImageUrl = null;
        this.uploadedImageId = null;
      },
      error: (err) => {
        console.error('❌ Ошибка при удалении:', err);
      }
    });
  }
}
