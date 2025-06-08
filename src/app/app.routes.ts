import { Routes } from '@angular/router';

import { DesauthComponent } from './pages/desauth/desauth.component';

export const routes: Routes = [
    {path:'desauth',component:DesauthComponent},
    { path: '',   redirectTo: '/desauth', pathMatch: 'full' },
    { path: '**', redirectTo: '/desauth', pathMatch: 'full'},

];
