import { Component, OnInit } from '@angular/core';
import { ICards } from '../../models/cards';
import { CardsService } from '../../services/cards.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, ProgressSpinnerModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  [x: string]: any;
  card: ICards | null = null;
  loading = true;

  constructor(
    private cardService: CardsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cardService.getCardById(id).subscribe({
        next: (data) => {
          this.card = data || null;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/cards']);
        }
      });
    } else {
      this.router.navigate(['/cards']);
    }
  }

  /** Ссылка на WhatsApp с названием товара */
  getWhatsAppLink(): string {
    const baseUrl = 'https://wa.me/79110293030';
    const name = this.card?.name?.trim() || '';
    const text = name
      ? `Здравствуйте! Интересует товар: ${name}`
      : 'Здравствуйте! Интересует товар.';
    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  }

  onImgError(event: Event) {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl || imgEl.dataset['fallbackApplied'] === '1') return;
    imgEl.dataset['fallbackApplied'] = '1';
    if (this.card?.imgUrl) {
      imgEl.src = this.card.imgUrl;
    }
  }
}
