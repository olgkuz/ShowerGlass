import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { Subscription } from 'rxjs';
import { UserStorage } from '../../models/user';
import { UserService } from '../../services/user.service';

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
  isMobile = false;
  menuVisible = false;
  private userSubscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();

    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
      this.menuItems = this.initMenuItems();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  initMenuItems(): MenuItem[] {
    const items: MenuItem[] = [
      { label: 'Главная', routerLink: ['/home'] },
      { label: 'Галерея', routerLink: ['/gallery'] },
      { label: 'Информация', routerLink: ['/blog'] },
      { label: 'Что ещё мы делаем из стекла', routerLink: ['/others'] },
    ];

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

  @HostListener('document:keydown.escape')
  closeMenuOnEscape(): void {
    this.menuVisible = false;
  }

  private checkScreenSize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const next = window.innerWidth < 768;
    if (!next) {
      this.menuVisible = false;
    }
    if (next !== this.isMobile) {
      setTimeout(() => {
        this.isMobile = next;
        this.cdr.detectChanges();
      });
    }
  }
}
