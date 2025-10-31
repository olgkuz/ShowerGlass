import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { LoaderService } from '../services/loader.service';

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
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  showAside = false;
  isLoading = false;
  private loaderSub?: Subscription;
  private routerEventsSub?: Subscription;

  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.updateAside(this.router.url);

    this.routerEventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateAside(event.urlAfterRedirects);
      });

    this.loaderSub = this.loaderService.loader$.subscribe(val => {
      this.isLoading = val;
    });
  }

  ngOnDestroy(): void {
    if (this.loaderSub) {
      this.loaderSub.unsubscribe();
    }
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }

  private updateAside(url: string): void {
    this.showAside = /^\/card\/[^/]+$/.test(url);
  }
}

