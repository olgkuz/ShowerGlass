import { Routes } from '@angular/router';

import { DesauthComponent } from './pages/desauth/desauth.component';
import { LayoutComponent } from './layout/layout.component';
import { DesignerComponent } from './pages/designer/designer.component';

export const routes: Routes = [
    {path:'desauth',component:DesauthComponent},
    { path: '',   redirectTo: '/desauth', pathMatch: 'full' },
    { path: 'home', component:LayoutComponent},
    { path: 'designer', component:DesignerComponent},
    { path: '**', redirectTo: '/desauth', pathMatch: 'full'},

];
