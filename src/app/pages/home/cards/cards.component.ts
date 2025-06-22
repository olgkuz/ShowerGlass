import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { LoaderService } from '../../../services/loader.service';
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
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.setLoader(true); // включаем Loader при старте

    this.cardService.getCards().subscribe((data: ICards[]) => {
      this.cards = data;

      this.cards.forEach(card => {
        this.loadingImages[card.id] = true;
      });

      if (this.cards.length === 0) {
        this.loaderService.setLoader(false);
      }
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

      const allLoaded = Object.values(this.loadingImages).every(val => !val);

      if (allLoaded) {
        this.loaderService.setLoader(false); // выключаем Loader
      }
    }
  }

  goToCard(item: ICards): void {
    this.router.navigate(['/card', item.id]);
  }
}
