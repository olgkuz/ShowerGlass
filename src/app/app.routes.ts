import { Routes } from '@angular/router';

import { DesauthComponent } from './pages/desauth/desauth.component';
import { LayoutComponent } from './layout/layout.component';
import { DesignerComponent } from './pages/designer/designer.component';
import { CardComponent } from './pages/card/card.component';
import { CardsComponent } from './pages/home/cards/cards.component';

export const routes: Routes = [
    {path:'desauth',component:DesauthComponent},
    { path: '',   redirectTo: '/desauth', pathMatch: 'full' },
    { path: 'home', component:LayoutComponent,
        children:[
            {path:'', component:CardsComponent}
        ]
    },
    { path: 'designer', component:DesignerComponent},
    { path: '**', redirectTo: '/desauth', pathMatch: 'full'},

];
