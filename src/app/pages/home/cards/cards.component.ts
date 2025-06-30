import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { ICards } from '../../../models/cards';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  cards: ICards[] = [];
  loadingImages: { [key: string]: boolean } = {};

  constructor(
    private cardService: CardsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards(); // Просто присваиваем массив

    this.cards.forEach(card => {
      this.loadingImages[card.id] = true;
    });
  }

  onImageLoad(event: Event): void {
    const imgEl = event.target as HTMLImageElement;
    const src = imgEl.src;

    const id = this.cards.find(card =>
      src.includes(card.img)
    )?.id;

    if (id) {
      this.loadingImages[id] = false;
    }
  }

  goToCard(item: ICards): void {
    this.router.navigate(['/card', item.id]);
  }
}