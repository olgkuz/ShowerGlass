import { Component, OnDestroy, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserStorage } from '../../models/user';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  user: UserStorage | null = null;
  logoutIcon = 'pi pi-user';
  isMobile = window.innerWidth < 768;
  menuVisible = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();
  }

  ngOnDestroy() {}

  initMenuItems(): MenuItem[] {
    const items: MenuItem[] = [
      { label: 'Главная', routerLink: ['/home'] },
      { label: 'Галерея', routerLink: ['/gallery'] },
      { label: 'Информация', routerLink: ['/blog'] },
      { label: 'Что ещё мы делаем из стекла', routerLink: ['/others'] },
    ];

    if (this.user?.name === 'admin') {
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

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const next = window.innerWidth < 768;
    if (next !== this.isMobile) {
      setTimeout(() => {
        this.isMobile = next;
        this.cdr.detectChanges();
      });
    }
  }
}
