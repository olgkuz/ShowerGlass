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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    CheckboxModule
  ],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss',
  providers: [MessageService]
})
export class ContactformComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl(''),
    consent: new FormControl(false, [Validators.requiredTrue])
  });

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      this.http.post(`${environment.apiUrl}/contact`, formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успех',
            detail: 'Сообщение отправлено!',
            life: 4000,
          });
          this.contactForm.reset();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось отправить сообщение',
            life: 4000,
          });
        },
      });
    }
  }
}

