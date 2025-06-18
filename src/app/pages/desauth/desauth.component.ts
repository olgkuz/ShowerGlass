import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { AuthorizationComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-desauth',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    AuthorizationComponent,
    RegComponent
  ],
  templateUrl: './desauth.component.html',
  styleUrls: ['./desauth.component.scss']
})
export class DesauthComponent {
  activeTabIndex: number = 0;

  constructor(
    public userService: UserService,
    private router: Router
  ) {
    if (this.userService.isAuthenticated()) {
      this.redirectAuthenticatedUser();
    }
  }

  private redirectAuthenticatedUser(): void {
    const returnUrl = localStorage.getItem('returnUrl') || '/designer';
    this.router.navigateByUrl(returnUrl).catch(() => {
      this.router.navigate(['/designer']);
    });
    localStorage.removeItem('returnUrl');
  }
}
