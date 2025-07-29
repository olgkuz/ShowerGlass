import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { 
  IUser,
  IUserReg,
  AuthResponse,
  UserStorage 
} from '../models/user';
import { API } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private readonly LOGIN_KEY = 'user_login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  registerUser(userData: IUserReg, remember: boolean): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(API.reg, userData).pipe(
    tap((response) => {
      this.handleAuthSuccess(response, userData.login, remember); 
      this.showSuccess('Регистрация прошла успешно');
    }),
    catchError(error => this.handleError(error, 'Ошибка регистрации'))
  );
}



  authUser(credentials: IUser, remember: boolean): Observable<AuthResponse>
{
    
    return this.http.post<AuthResponse>(API.auth, credentials).pipe(
      tap((response) => {
  this.handleAuthSuccess(response, credentials.login, remember);
  this.showSuccess('Вход выполнен успешно');
}),

      catchError(error => this.handleError(error, 'Ошибка авторизации'))
    );
  }

  private handleAuthSuccess(response: AuthResponse, login: string, remember: boolean): void {
  this.saveAuthData(response.token, login, remember);
  this.setUser({
    login: response.user.login,
    email: response.user.email,
    id: response.user.id
  }, remember);
  this.router.navigate(['/designer']);
}


  private saveAuthData(token: string, login: string, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.LOGIN_KEY, login);
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
    return localStorage.getItem(this.TOKEN_KEY) || 
           sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): UserStorage | null {
    const userData = localStorage.getItem(this.USER_KEY) || 
                    sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    [this.TOKEN_KEY, this.USER_KEY, this.LOGIN_KEY, 'returnUrl'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    this.showSuccess('Выход выполнен');
    this.router.navigate(['/desauth']);

  }

  private handleError(error: any, defaultMessage: string): Observable<never> {
    const errorMessage = error.error?.message || defaultMessage;
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
      summary: 'Успешно',
      detail: message,
      life: 3000
    });
  }
}