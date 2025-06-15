import { Routes } from '@angular/router';
import { DesauthComponent } from './pages/desauth/desauth.component';
import { LayoutComponent } from './layout/layout.component';
import { DesignerComponent } from './pages/designer/designer.component';
import { CardComponent } from './pages/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { authGuard } from './shared/guards/auth.guard';
import { inject } from '@angular/core';
import { UserService } from './services/user.service';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Открытые маршруты
      { path: 'home', component: HomeComponent },
      { path: 'card/:id', component: CardComponent },
      { path: 'contacts', component: ContactsComponent },
      
      // Дефолтный редирект
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  
  // Страница авторизации (не использует LayoutComponent)
  { 
    path: 'desauth', 
    component: DesauthComponent,
    // Запрещаем доступ если уже авторизован
    canActivate: [() => !inject(UserService).isAuthenticated()] 
  },
  
  // Защищенный маршрут
  { 
    path: 'designer',
    component: DesignerComponent,
    canActivate: [authGuard] // Проверка через UserService
  },
  
  // Fallback маршрут
  { path: '**', redirectTo: 'home' }
];