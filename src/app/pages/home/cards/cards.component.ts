import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { ICards } from '../../../models/cards';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule,ProgressSpinnerModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  cards: ICards[] = [];
  loading = true;

  constructor(
    private cardService: CardsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goToCard(item: ICards): void {
    this.router.navigate(['/card', item.id]);
  }

  onImgError(event: Event, item: ICards) {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl || imgEl.dataset['fallbackApplied'] === '1') return;
    imgEl.dataset['fallbackApplied'] = '1';
    if (item.imgUrl) {
      imgEl.src = item.imgUrl;
    }
  }
}
