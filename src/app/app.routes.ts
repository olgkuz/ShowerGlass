import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CardComponent } from './pages/card/card.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DesauthComponent } from './pages/desauth/desauth.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { DesignerComponent } from './pages/designer/designer.component';
import { UserService } from './services/user.service';
import { authGuard } from './shared/guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { CardsComponent } from './pages/home/cards/cards.component';
import { PrivacyPolicyComponent } from './pages/privacypolicy/privacyPolicy.component';

// ✅ новые компоненты раздела "Что ещё мы делаем из стекла"
import { OthersComponent } from './pages/others/others.component';
import { OtherElementComponent } from './pages/otherelement/otherelement.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'card/:id', component: CardComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },

      // ✅ новые маршруты
      { path: 'others', component: OthersComponent },
      { path: 'other/:id', component: OtherElementComponent },

      // Только для admin
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [() => {
          const user = inject(UserService).getUser();
          return user?.name === 'admin';
        }]
      },

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: 'desauth', component: DesauthComponent },

  { path: 'designer', component: DesignerComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'home' }
];
