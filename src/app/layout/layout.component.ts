import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { LoaderService } from '../services/loader.service';  // <-- добавим
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';  // <-- для отписки
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    AsideComponent,
    ProgressSpinnerModule 
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  showAside = false;
  isLoading = false;
  private loaderSub: Subscription;

  constructor(
    private router: Router,
    private loaderService: LoaderService  // <-- добавили
  ) {}

  ngOnInit(): void {
    this.updateAside(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateAside(event.urlAfterRedirects);
      });

    // Подписываемся на loader
    this.loaderSub = this.loaderService.loader$.subscribe(val => {
      this.isLoading = val;
    });
  }

  ngOnDestroy(): void {
    // Чистим подписку на loader
    if (this.loaderSub) {
      this.loaderSub.unsubscribe();
    }
  }

  private updateAside(url: string): void {
    // Показываем aside только на /card/:id
    this.showAside = /^\/card\/[^/]+$/.test(url);
  }
}
