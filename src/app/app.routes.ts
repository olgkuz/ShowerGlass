import { inject } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { BlogComponent } from './pages/blog/blog.component';    
import { CardComponent } from './pages/card/card.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DesauthComponent } from './pages/desauth/desauth.component';
import { GalleryComponent } from './pages/gallery/gallery.component'; 
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './services/user.service';
import { DesignerComponent } from './pages/designer/designer.component';
import { authGuard } from './shared/guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'gallery', component: GalleryComponent },  
      { path: 'blog', component: BlogComponent },        
      { path: 'card/:id', component: CardComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { 
    path: 'desauth', 
    component: DesauthComponent,
    canActivate: [() => !inject(UserService).isAuthenticated()] 
  },

  { 
    path: 'designer',
    component: DesignerComponent,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'home' }
];
