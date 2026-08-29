import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthResponse, IUser, IUserReg, UserStorage } from '../models/user';
import { API } from '../shared/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private readonly NAME_KEY = 'user_name';

  private userSubject = new BehaviorSubject<UserStorage | null>(this.getUser());
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: object
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

  loginAsAdmin(remember: boolean): void {
    this.saveAuthData('local-admin-token', 'admin', remember);
    const user = {
      name: 'admin',
      email: 'admin@local',
      id: 'local-admin'
    };
    this.setUser(user, remember);
    this.userSubject.next(user);
    this.router.navigate(['/settings']);
  }

  private handleAuthSuccess(
    response: AuthResponse,
    name: string,
    remember: boolean
  ): void {
    this.saveAuthData(response.token, name, remember);
    const user = {
      name: response.user.name,
      email: response.user.email,
      id: response.user.id
    };
    this.setUser(user, remember);
    this.userSubject.next(user);

    const targetRoute =
      response.user.name === 'admin' || response.user.name === 'glassadmin' || response.user.name === 'newadmin'
        ? '/settings'
        : '/home';
    this.router.navigate([targetRoute]);
  }

  private saveAuthData(token: string, name: string, remember: boolean): void {
    if (!this.isBrowser()) {
      return;
    }

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.NAME_KEY, name);
  }

  setUser(user: UserStorage | null, remember: boolean): void {
    if (!this.isBrowser()) {
      return;
    }

    const storage = remember ? localStorage : sessionStorage;
    if (user) {
      storage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      storage.removeItem(this.USER_KEY);
    }
  }

  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }

    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  getUser(): UserStorage | null {
    if (!this.isBrowser()) {
      return null;
    }

    const userData =
      localStorage.getItem(this.USER_KEY) ||
      sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (!this.isBrowser()) {
      return;
    }

    [this.TOKEN_KEY, this.USER_KEY, this.NAME_KEY, 'returnUrl'].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    this.userSubject.next(null);
    this.showSuccess('Вы вышли из аккаунта');
    this.router.navigate(['/home']);
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

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
