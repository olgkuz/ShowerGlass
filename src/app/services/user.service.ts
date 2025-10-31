import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthResponse, IUser, IUserReg, UserStorage } from '../models/user';
import { API } from '../shared/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private readonly NAME_KEY = 'user_name';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  registerUser(userData: IUserReg, remember: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API.reg, userData).pipe(
      tap((response) => {
        this.handleAuthSuccess(response, userData.name, remember);
        this.showSuccess('Регистрация прошла успешно');
      }),
      catchError((error) => this.handleError(error, 'Ошибка регистрации'))
    );
  }

  authUser(credentials: IUser, remember: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API.auth, credentials).pipe(
      tap((response) => {
        this.handleAuthSuccess(response, credentials.name, remember);
        this.showSuccess('Вход выполнен успешно');
      }),
      catchError((error) => this.handleError(error, 'Ошибка авторизации'))
    );
  }

  private handleAuthSuccess(
    response: AuthResponse,
    name: string,
    remember: boolean
  ): void {
    this.saveAuthData(response.token, name, remember);
    this.setUser(
      {
        name: response.user.name,
        email: response.user.email,
        id: response.user.id
      },
      remember
    );

    const targetRoute = response.user.name === 'admin' ? '/settings' : '/designer';
    this.router.navigate([targetRoute]);
  }

  private saveAuthData(token: string, name: string, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.NAME_KEY, name);
  }

  setUser(user: UserStorage | null, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    if (user) {
      storage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      storage.removeItem(this.USER_KEY);
    }
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  getUser(): UserStorage | null {
    const userData =
      localStorage.getItem(this.USER_KEY) ||
      sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    [this.TOKEN_KEY, this.USER_KEY, this.NAME_KEY, 'returnUrl'].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    this.showSuccess('Вы вышли из аккаунта');
    this.router.navigate(['/desauth']);
  }

  private handleError(error: any, defaultMessage: string): Observable<never> {
    const errorMessage = error?.error?.message || defaultMessage;
    this.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
      life: 3000
    });
  }

  private showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Готово',
      detail: message,
      life: 3000
    });
  }
}

