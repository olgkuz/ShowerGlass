import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserStorage } from '../../models/user';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent {
  designerForm = new FormGroup({
    objectName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  selectedFile: File | null = null;
  fileName = '';
  user: UserStorage | null = null; // ✅ добавили хранение пользователя

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.user = this.userService.getUser(); // ✅ получаем пользователя при загрузке
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.fileName = file.name;
      } else {
        alert('Допустимы только PDF или изображения');
      }
    }
  }

  submitForm() {
  if (this.designerForm.valid && this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('objectName', this.designerForm.value.objectName!);
    formData.append('phone', this.designerForm.value.phone!);
    formData.append('comment', this.designerForm.value.comment!);

    // Получаем токен из UserService
    const token = this.userService.getToken(); 
    
    // Добавляем заголовок с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`${environment.apiUrl}/designers/upload`, formData, { headers }).subscribe({
      next: () => {
        alert('Задание успешно отправлено!');
        this.designerForm.reset();
        this.selectedFile = null;
        this.fileName = '';
      },
      error: (err) => {
        console.error('Ошибка:', err);
        alert('Ошибка при отправке: ' + err?.error?.message || err.message);
      }
    });
  }
}}