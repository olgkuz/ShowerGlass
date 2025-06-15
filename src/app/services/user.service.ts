import { Injectable } from '@angular/core';
import { IUser, IUserReg } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {}

  registerUser(user: IUserReg): Observable<string> {
    return this.http.post(API.reg, user, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.saveAuthData(token, user.login, true);
        this.setUser({
          login: user.login,
          email: user.email
          // Добавьте другие поля при необходимости
        }, true);
      })
    );
  }

  authUser(user: IUser): Observable<string> {
    return this.http.post<string>(API.desauth, user).pipe(
      tap((token: string) => {
        this.saveAuthData(token, user.login, true);
        this.setUser({
          login: user.login
          // Добавьте другие поля после авторизации
        }, true);
      })
    );
  }

  private saveAuthData(token: string, login: string, remember: boolean = true): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
  }

  setUser(user: { login: string; email?: string; /* другие поля */ }, remember: boolean = true): void {
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
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('returnUrl');
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
}