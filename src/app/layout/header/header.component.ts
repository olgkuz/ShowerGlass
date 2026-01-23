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
      { label: 'Р“Р»Р°РІРЅР°СЏ', routerLink: ['/home'] },
      { label: 'Р“Р°Р»РµСЂРµСЏ', routerLink: ['/gallery'] },
      { label: 'РРЅС„РѕСЂРјР°С†РёСЏ', routerLink: ['/blog'] },
      { label: 'Р§С‚Рѕ РµС‰С‘ РјС‹ РґРµР»Р°РµРј РёР· СЃС‚РµРєР»Р°', routerLink: ['/others'] },
    ];

    if (this.user?.name === 'admin' || this.user?.name === 'glassadmin') {
      items.push({ label: 'РќР°СЃС‚СЂРѕР№РєРё', routerLink: ['/settings'] });
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

