import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, skip, Subscription } from 'rxjs';

declare global {
  interface Window {
    ym?: (counterId: number, method: string, target?: string, params?: Record<string, unknown>) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class MetrikaService {
  private readonly counterId = 110022252;
  private pageViewsSubscription?: Subscription;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  reachGoal(target: string, params?: Record<string, unknown>): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.ym !== 'function') {
      return;
    }

    window.ym?.(this.counterId, 'reachGoal', target, params);
  }

  startPageViewTracking(router: Router): void {
    if (!isPlatformBrowser(this.platformId) || this.pageViewsSubscription) {
      return;
    }

    // The counter records the initial page during init. Angular navigations do
    // not reload the document, so every subsequent route needs an explicit hit.
    this.pageViewsSubscription = router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      distinctUntilChanged(),
      skip(1)
    ).subscribe((url) => {
      window.ym?.(this.counterId, 'hit', url, {
        title: document.title,
        referer: document.referrer
      });
    });
  }
}
