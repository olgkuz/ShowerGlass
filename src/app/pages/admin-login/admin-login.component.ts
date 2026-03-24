import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  login = '';
  password = '';
  rememberMe = true;
  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  submit(): void {
    if (this.login !== 'admin' || this.password !== '123456') {
      this.errorMessage = 'Неверный логин или пароль';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;
    this.userService.loginAsAdmin(this.rememberMe);
    this.router.navigate(['/settings']);
  }
}
