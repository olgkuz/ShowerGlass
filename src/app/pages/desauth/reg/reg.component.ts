import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { IUserReg } from '../../../models/user';

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
    private router: Router,
    private messageService: MessageService
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

    const userData: IUserReg = {
      login: this.login,
      email: this.email,
      password: this.password
    };

    this.userService.registerUser(userData).subscribe({
      next: (token) => {
        this.userService.setUser({ login: this.login }, this.rememberMe);
        this.router.navigate(['/designer']);
      },
      error: (err) => {
        this.showError(err.error?.message || 'Ошибка регистрации');
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
      life: 3000
    });
  }
}