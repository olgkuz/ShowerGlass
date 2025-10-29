import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('./pages/home/cards/cards.component').then(
            m => m.CardsComponent
          )
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/gallery/gallery.component').then(
            m => m.GalleryComponent
          )
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./pages/blog/blog.component').then(m => m.BlogComponent)
      },
      {
        path: 'card/:id',
        loadComponent: () =>
          import('./pages/card/card.component').then(m => m.CardComponent)
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./pages/contacts/contacts.component').then(
            m => m.ContactsComponent
          )
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/privacypolicy/privacyPolicy.component').then(
            m => m.PrivacyPolicyComponent
          )
      },
      {
        path: 'others',
        loadComponent: () =>
          import('./pages/others/others.component').then(
            m => m.OthersComponent
          )
      },
      {
        path: 'other/:id',
        loadComponent: () =>
          import('./pages/otherelement/otherelement.component').then(
            m => m.OtherElementComponent
          )
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            m => m.SettingsComponent
          ),
        canActivate: [() => {
          const user = inject(UserService).getUser();
          return user?.name === 'admin';
        }]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'desauth',
    loadComponent: () =>
      import('./pages/desauth/desauth.component').then(
        m => m.DesauthComponent
      )
  },
  {
    path: 'designer',
    loadComponent: () =>
      import('./pages/designer/designer.component').then(
        m => m.DesignerComponent
      ),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'home' }
];
