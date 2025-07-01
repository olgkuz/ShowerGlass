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
    CommonModule,
    NgClass,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthorizationComponent {
  login: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return this.login?.length >= 3 && this.password?.length >= 6;
  }

  onAuth(): void {
    if (!this.isFormValid()) return;

    this.isLoading = true;
  this.userService.authUser({
  login: this.login,
  password: this.password
}, this.rememberMe).subscribe({
  next: () => {
    this.isLoading = false;
    this.login = '';
    this.password = '';
    this.rememberMe = false;
  },
  error: (err) => {
    this.isLoading = false;
  }
});

  }
}
