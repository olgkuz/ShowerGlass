import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { AuthorizationComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-desauth',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    AuthorizationComponent,
    RegComponent
  ],
  templateUrl: './desauth.component.html',
  styleUrls: ['./desauth.component.scss']
})
export class DesauthComponent implements OnInit {
  logoutIcon = 'pi pi-user';
  user: IUser | null = null;

  constructor(
    public userService: UserService,
    private router: Router
  ) {
    if (this.userService.isAuthenticated()) {
      const returnUrl = localStorage.getItem('returnUrl') || '/designer';
      this.router.navigateByUrl(returnUrl).catch(() => {
        this.router.navigate(['/designer']);
      });
    }
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logOut(): void {
    this.userService.setUser(null, true);
    this.router.navigate(['/home']);
  }

  hoverLogoutBtn(val: boolean): void {
    this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
  }
}

