import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule
  ],
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent {
  login: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return this.login?.length >= 3 && 
           this.email?.includes('@') &&
           this.password?.length >= 6 &&
           this.password === this.repeatPassword;
  }

  onRegister(): void {
    if (!this.isFormValid()) return;

    this.isLoading = true;
    this.userService.registerUser({
      login: this.login,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.isLoading = false;

        // Форма очищается
        
        this.login = '';
        this.email = '';
        this.password = '';
        this.repeatPassword = '';
        this.rememberMe = false;

        // Переход на /designer в UserService
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
}
