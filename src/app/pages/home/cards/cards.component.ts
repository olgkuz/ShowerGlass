import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { ICards } from '../../../models/cards';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-cards',
  imports: [CardModule,ButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
  
})
export class CardsComponent implements OnInit { 
  cards: ICards[] = [];
  constructor( private cardService: CardsService){}

  ngOnInit(): void {
    
    this.cardService.getCards().subscribe((data) =>{
      if (Array.isArray(data?.cards)) {
        this.cards = data.cards;
      }
    });
  }
}
