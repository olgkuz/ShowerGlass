import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-main',
  imports: [CommonModule, ButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  onMeasureClick(button: HTMLElement) {
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
