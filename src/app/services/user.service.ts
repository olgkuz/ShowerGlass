import { Injectable } from '@angular/core';
import { IUser, IUserReg } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  // Регистрация пользователя
  registerUser(user: IUserReg): Observable<any> {
    return this.http.post(API.reg, user).pipe(
      tap((response: any) => {
        this.saveAuthData(response.token, user.login, true);
        this.setUser({
          login: user.login,
          email: user.email,
          id: response.user.id
        }, true);
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка регистрации',
          detail: error.error?.message || 'Неизвестная ошибка',
          life: 3000
        });
        return throwError(() => error);
      })
    );
  }

  // Аутентификация пользователя
  authUser(user: IUser): Observable<any> {
    return this.http.post(API.auth, user).pipe(
      tap((response: any) => {
        this.saveAuthData(response.token, user.login, true);
        this.setUser({
          login: user.login,
          email: response.user?.email,
          id: response.user.id
        }, true);
        this.router.navigate(['/designer']);
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка авторизации',
          detail: error.error?.message || 'Неверный логин или пароль',
          life: 3000
        });
        return throwError(() => error);
      })
    );
  }

  private saveAuthData(token: string, login: string, remember: boolean = true): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem('user_login', login);
  }

  setUser(user: { login: string; email?: string; id?: string }, remember: boolean = true): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || 
           sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): IUser | null {
    const userData = localStorage.getItem(this.USER_KEY) || 
                    sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    ['auth_token', 'current_user', 'user_login', 'returnUrl'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    this.router.navigate(['/auth']);
  }
}