import { Component, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { CardsComponent } from './cards/cards.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ContactformComponent } from './contactform/contactform.component';
import { MainComponent } from './main/main.component';
import { CardsService } from '../../services/cards.service';
import { LoaderService } from '../../services/loader.service';
import { MessageService } from 'primeng/api';
import { ICards } from '../../models/cards';

@Component({
  selector: 'app-home',
  imports: [
    MainComponent,
    HeroComponent,
    CardsComponent,
    AccordionComponent,
    ContactformComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]  // нужно для showError
})
export class HomeComponent implements OnInit {
  cards: ICards[] = [];

  constructor(
    private cardService: CardsService,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.loaderService.setLoader(true);

    this.cardService.getCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.loaderService.setLoader(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки карточек:', err);
        this.showError('Не удалось загрузить карточки. Попробуйте позже.');
        this.loaderService.setLoader(false);
      }
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
      life: 4000
    });
  }
}

