import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule, 
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[] = [];
  user: IUser;
  logoutIcon = 'pi pi-user';
  isMobile = false;
  menuVisible = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();
    this.checkScreenSize();
  }

  ngOnDestroy() {}

  initMenuItems(): MenuItem[] {
  const items: MenuItem[] = [
    { label: 'Главная', routerLink: ['/home'] },
    { label: 'Галерея', routerLink: ['/gallery'] },
    { label: 'Информация', routerLink: ['/blog'] },
    { label: 'Дизайнерам', routerLink: ['/desauth'] }
  ];

  if (this.user?.login === 'admin') {
    items.push({ label: 'Настройки', routerLink: ['/settings'] });
  }

  return items;
}


  goToContacts(): void {
    this.router.navigate(['/contacts']);
  }

  navigate(route: any[]): void {
    this.router.navigate(route);
    this.menuVisible = false;
  }

  @HostListener('window:resize', []) // изменение размера окна браузера
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
