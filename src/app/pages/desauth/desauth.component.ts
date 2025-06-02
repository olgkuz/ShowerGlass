import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { AuthComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';
@Component({
  selector: 'app-desauth',
  imports: [AuthComponent,RegComponent, TabsModule],
  templateUrl: './desauth.component.html',
  styleUrl: './desauth.component.scss',
})
export class DesauthComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    
  }
}

