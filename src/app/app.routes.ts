import { Routes } from '@angular/router';

import { DesauthComponent } from './pages/desauth/desauth.component';
import { LayoutComponent } from './layout/layout.component';
import { DesignerComponent } from './pages/designer/designer.component';
import { CardComponent } from './pages/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

export const routes: Routes = [
  // Родительский маршрут с общим макетом (LayoutComponent)
  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },              // Главная страница (Hero, Cards, Accordion, ContactForm)
      { path: 'card/:id', component: CardComponent },          // Страница отдельной карточки
      { path: 'contacts', component: ContactsComponent },      // Страница контактов
      { 
        path: 'designer', 
        component: DesignerComponent, 
       // canActivate: [AuthGuard]                               // Страница дизайнеров (защищена AuthGuard)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }      // Переход на /home при пустом пути
    ]
  },

  // Отдельный маршрут для страницы авторизации (не вложен в LayoutComponent)
  { path: 'desauth', component: DesauthComponent },

  // Маршрут-шаблон для несуществующих путей (редирект на главную)
  { path: '**', redirectTo: 'home' }
]; 
