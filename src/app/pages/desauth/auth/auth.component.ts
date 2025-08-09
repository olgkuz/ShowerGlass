import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthorizationComponent {
  name = '';
  password = '';
  rememberMe = false;
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return (this.name?.length ?? 0) >= 3 && (this.password?.length ?? 0) >= 6;
  }

  onAuth(): void {
    if (!this.isFormValid() || this.isLoading) return;

    this.isLoading = true;
    this.userService.authUser(
      { name: this.name, password: this.password },
      this.rememberMe
    ).subscribe({
      next: () => {
        this.isLoading = false;
        const user = this.userService.getUser();
        const targetRoute = user?.name === 'admin' ? '/settings' : '/designer';
        this.router.navigate([targetRoute]);
        this.name = '';
        this.password = '';
        this.rememberMe = false;
      },
      error: () => { this.isLoading = false; }
    });
  }
}
