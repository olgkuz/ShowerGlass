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

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss',
  providers: [MessageService]
})
export class ContactformComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('')
  });

  constructor(private messageService: MessageService) {}

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Форма отправлена', this.contactForm.value);
      this.contactForm.reset();

      this.messageService.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Сообщение успешно отправлено',
        life: 4000
      });
    }
  }
}
