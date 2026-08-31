import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { asapScheduler, Subscription, timeout } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../environments/environment';

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
  networkProblem = false;
  checkingNetwork = false;
  networkNoticeDismissed = false;
  private readonly networkNoticeDismissedKey = 'steklokontur-network-notice-dismissed';
  private loaderSub?: Subscription;
  private routerEventsSub?: Subscription;
  private apiCheckSub?: Subscription;
  private readonly healthUrl = environment.apiUrl.replace(/\/api\/?$/, '/health');

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.networkNoticeDismissed = sessionStorage.getItem(this.networkNoticeDismissedKey) === '1';
      this.networkProblem = !navigator.onLine && !this.networkNoticeDismissed;
      if (navigator.onLine) this.checkConnection();
    }

    this.updateAside(this.router.url);

    this.routerEventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateAside(event.urlAfterRedirects);
      });

    this.loaderSub = this.loaderService.loader$
      .pipe(observeOn(asapScheduler))
      .subscribe(val => {
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
    this.apiCheckSub?.unsubscribe();
  }

  @HostListener('window:offline')
  onOffline(): void {
    if (!this.networkNoticeDismissed) this.networkProblem = true;
  }

  @HostListener('window:online')
  onOnline(): void {
    this.checkConnection();
  }

  checkConnection(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!navigator.onLine) {
      if (!this.networkNoticeDismissed) this.networkProblem = true;
      return;
    }

    this.checkingNetwork = true;
    this.apiCheckSub?.unsubscribe();
    this.apiCheckSub = this.http.get(this.healthUrl).pipe(timeout(8000)).subscribe({
      next: () => {
        this.networkProblem = false;
        this.checkingNetwork = false;
      },
      error: () => {
        if (!this.networkNoticeDismissed) this.networkProblem = true;
        this.checkingNetwork = false;
      }
    });
  }

  dismissNetworkNotice(): void {
    this.networkProblem = false;
    this.networkNoticeDismissed = true;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.networkNoticeDismissedKey, '1');
    }
  }

  private updateAside(url: string): void {
    this.showAside = /^\/card\/[^/]+$/.test(url);
  }
}
