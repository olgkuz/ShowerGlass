import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { environment } from '../../../environments/environment';
import { UserStorage } from '../../models/user';
import { UserService } from '../../services/user.service';

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
  user: UserStorage | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.fileName = file.name;
      } else {
        alert('Поддерживаются только PDF или изображения.');
      }
    }
  }

  submitForm(): void {
    if (!this.designerForm.valid || !this.selectedFile) {
      this.designerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('objectName', this.designerForm.value.objectName ?? '');
    formData.append('phone', this.designerForm.value.phone ?? '');
    formData.append('comment', this.designerForm.value.comment ?? '');

    const token = this.userService.getToken();
    const options = token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};

    this.http
      .post(`${environment.apiUrl}/designers/upload`, formData, options)
      .subscribe({
        next: () => {
          alert('Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
          this.designerForm.reset();
          this.selectedFile = null;
          this.fileName = '';
        },
        error: (err) => {
          console.error('Ошибка при отправке заявки:', err);
          const errorMessage =
            err?.error?.message || err?.message || 'Неизвестная ошибка';
          alert(`Ошибка при отправке заявки: ${errorMessage}`);
        }
      });
  }
}
