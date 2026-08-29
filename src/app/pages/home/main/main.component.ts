import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MetrikaService } from '../../../services/metrika.service';


@Component({
  selector: 'app-main',
  imports: [CommonModule, ButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
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
}
