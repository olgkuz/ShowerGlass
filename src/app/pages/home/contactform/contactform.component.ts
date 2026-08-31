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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { MetrikaService } from '../../../services/metrika.service';
import { Router, RouterModule } from '@angular/router';

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
    RouterModule,
  ],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss',
  providers: [MessageService],
})
export class ContactformComponent {
  private readonly contactEndpoint =
    environment.contactEndpoint ?? `${environment.apiUrl}/contact`;

  // Allow digits, plus, parentheses, spaces and hyphens only.
  phonePattern = '^[0-9+() -]+$';
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  submitMessage = '';

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
    private http: HttpClient,
    private metrika: MetrikaService,
    private router: Router
  ) {}

  private getFormSource(): 'home' | 'contacts' | 'seo' {
    if (this.router.url.startsWith('/contacts')) return 'contacts';
    if (this.router.url.startsWith('/dushevye-ograzhdeniya')) return 'seo';
    return 'home';
  }

  submitForm() {
    if (this.contactForm.invalid || this.isSubmitting) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.contactForm.valid) {
      const { name, phone, message } = this.contactForm.value;
      const formData = { name, phone, message, source: this.getFormSource() };

      this.isSubmitting = true;
      this.submitStatus = 'idle';
      this.submitMessage = '';

      this.http
        .post(this.contactEndpoint, formData)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.contactForm.reset({ consent: false });
            this.submitStatus = 'success';
            this.submitMessage = 'Заявка отправлена. Мы получили ваши контакты и свяжемся с вами.';
            this.metrika.reachGoal('contact_form_success');
            this.messageService.add({
              severity: 'success',
              summary: 'Заявка отправлена',
              detail:
                'Мы получили ваши контакты и свяжемся с вами в ближайшее время.',
              life: 4000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.isSubmitting = false;
            this.submitStatus = 'error';
            this.submitMessage = error.status === 429
              ? 'Слишком много попыток. Подождите 10 минут и отправьте заявку снова.'
              : 'Заявка не отправлена. Проверьте телефон и соединение, затем повторите попытку.';
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
