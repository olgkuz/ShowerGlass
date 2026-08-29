import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetrikaService } from '../../services/metrika.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private readonly metrika: MetrikaService) {}

  trackGoal(target: string): void {
    this.metrika.reachGoal(target);
  }
}

