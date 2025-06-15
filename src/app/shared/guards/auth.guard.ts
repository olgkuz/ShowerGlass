import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) {
    return true;
  }

  // Сохраняем URL для редиректа после входа
  localStorage.setItem('returnUrl', state.url);
  router.navigate(['/desauth']);
  return false;
};