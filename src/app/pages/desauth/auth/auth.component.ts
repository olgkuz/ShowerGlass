import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    CommonModule,  // Нужен для NgClass
    NgClass,
    FormsModule,   // Для ngModel
    ButtonModule,  // Компоненты PrimeNG
    InputTextModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthorizationComponent {
  login: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  isFormValid(): boolean {
    return this.login?.length >= 3 && this.password?.length >= 6;
  }

  onAuth(): void {
    const user = {
      login: this.login,
      password: this.password
    };

    this.userService.authUser(user).subscribe({
      next: () => {
        this.userService.setUser(user);
        this.router.navigate(['designer']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          detail: 'Ошибка авторизации',
          life: 3000
        });
      }
    });
  }
}