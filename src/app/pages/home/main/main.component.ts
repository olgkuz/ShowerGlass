import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MetrikaService } from '../../../services/metrika.service';


@Component({
  selector: 'app-main',
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  activeSlide = 0;
  touchStartX = 0;

  readonly heroSlides = [
    { image: 'assets/img/mobile-hero/shower.jpg', title: 'Душевые ограждения из стекла на заказ', text: 'Замер, изготовление и монтаж в Санкт-Петербурге', button: 'Выбрать конструкцию', link: '/cards' },
    { image: 'assets/img/mobile-hero/partitions.jpg', title: 'Межкомнатные перегородки и двери из стекла', text: 'Распашные и раздвижные конструкции по вашим размерам', button: 'Смотреть варианты', link: '/others' },
    { image: 'assets/img/mobile-hero/railings.jpg', title: 'Лестничные и балюстрадные ограждения', text: 'Безопасное закалённое стекло для дома и бизнеса', button: 'Рассчитать проект', link: '/others' }
  ];

  constructor(private readonly metrika: MetrikaService) {}

  onMeasureClick(button: HTMLElement) {
    this.metrika.reachGoal('home_measure_click');
    button.classList.add('main-button-pressed');
    window.setTimeout(() => button.classList.remove('main-button-pressed'), 220);
    this.scrollToContact();
  }
  

  scrollToContact() {
    const el = document.getElementById('contactform');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setSlide(index: number): void { this.activeSlide = (index + this.heroSlides.length) % this.heroSlides.length; }
  nextSlide(): void { this.setSlide(this.activeSlide + 1); }
  previousSlide(): void { this.setSlide(this.activeSlide - 1); }
  onTouchStart(event: TouchEvent): void { this.touchStartX = event.changedTouches[0]?.clientX ?? 0; }
  onTouchEnd(event: TouchEvent): void {
    const delta = (event.changedTouches[0]?.clientX ?? this.touchStartX) - this.touchStartX;
    if (Math.abs(delta) >= 40) delta < 0 ? this.nextSlide() : this.previousSlide();
  }
}
