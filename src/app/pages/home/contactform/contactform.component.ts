import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { tap } from 'rxjs';

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
    CheckboxModule,
  ],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss',
  providers: [MessageService],
})
export class ContactformComponent {
  private readonly contactEndpoint =
    environment.contactEndpoint ?? `${environment.apiUrl}/contact`;

  // Разрешаем только цифры, плюс, пробелы, скобки и дефисы
  // Allow digits, plus, parentheses, spaces and hyphens only.
  phonePattern = '^[0-9+()\\- ]+$';

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.phonePattern),
    ]),
    message: new FormControl(''),
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  submitForm() {
    if (this.contactForm.valid) {
      const { name, phone, message } = this.contactForm.value;
      const formData = { name, phone, message };

      this.http
        .post(this.contactEndpoint, formData)
        .pipe(tap(() => this.contactForm.reset({ consent: false })))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Заявка отправлена',
              detail:
                'Мы получили ваши контакты и свяжемся с вами в ближайшее время.',
              life: 4000,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Не удалось отправить',
              detail: 'Проверьте соединение и попробуйте ещё раз.',
              life: 4000,
            });
          },
        });
    }
  }
}
