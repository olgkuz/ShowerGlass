import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-hero-mosaic',
  standalone: true,
  templateUrl: './hero-mosaic.component.html',
  styleUrl: './hero-mosaic.component.scss',
})
export class HeroMosaicComponent implements AfterViewInit, OnDestroy {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;
  @ViewChild('mainPart', { static: true }) mainPart!: ElementRef<HTMLElement>;
  @ViewChild('hingePart', { static: true }) hingePart!: ElementRef<HTMLElement>;
  @ViewChild('handlePart', { static: true }) handlePart!: ElementRef<HTMLElement>;
  @ViewChild('footerPart', { static: true }) footerPart!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;
  private intersectionObserver?: IntersectionObserver;
  private loaderSubscription?: Subscription;
  private hasAnimated = false;
  private isInView = false;
  private isLoaderDone = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly loaderService: LoaderService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const parts = [
      this.mainPart.nativeElement,
      this.hingePart.nativeElement,
      this.handlePart.nativeElement,
      this.footerPart.nativeElement,
    ];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(parts, { opacity: 1, xPercent: 0, yPercent: 0 });
      return;
    }

    gsap.set(this.mainPart.nativeElement, { xPercent: -22, yPercent: 14, opacity: 0 });
    gsap.set(this.hingePart.nativeElement, { xPercent: 22, yPercent: -14, opacity: 0 });
    gsap.set(this.handlePart.nativeElement, { xPercent: 18, yPercent: 18, opacity: 0 });
    gsap.set(this.footerPart.nativeElement, { yPercent: 60, opacity: 0 });

    this.intersectionObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting && !this.hasAnimated) {
          this.isInView = true;
          this.tryPlayAnimation();
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    this.intersectionObserver.observe(this.section.nativeElement);

    this.loaderSubscription = this.loaderService.loader$.subscribe(isLoading => {
      this.isLoaderDone = !isLoading;
      this.tryPlayAnimation();
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    this.loaderSubscription?.unsubscribe();
    this.animationContext?.revert();
  }

  private tryPlayAnimation(): void {
    if (this.hasAnimated || !this.isInView || !this.isLoaderDone) return;

    this.hasAnimated = true;
    this.playAnimation();
    this.intersectionObserver?.disconnect();
    this.loaderSubscription?.unsubscribe();
  }

  private playAnimation(): void {
    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.35,
        defaults: {
          duration: 2.15,
          ease: 'power3.out',
        },
      });

      timeline
        .to(this.mainPart.nativeElement, { xPercent: 0, yPercent: 0, opacity: 1 }, 0)
        .to(this.hingePart.nativeElement, { xPercent: 0, yPercent: 0, opacity: 1 }, 0.28)
        .to(this.handlePart.nativeElement, { xPercent: 0, yPercent: 0, opacity: 1 }, 0.52)
        .to(this.footerPart.nativeElement, { yPercent: 0, opacity: 1 }, 0.76);
    }, this.stage.nativeElement);
  }
}
