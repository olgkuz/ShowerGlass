import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { ICards } from '../../../models/cards';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cards',
  imports: [CardModule,ButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
  
})
export class CardsComponent implements OnInit { 
  cards: ICards[] = [];
  constructor( private cardService: CardsService,
    private route:ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    
    this.cardService.getCards().subscribe((data: ICards[]) =>
       {
        this.cards = data;
      }
    );
  }
  goToCard (item:ICards): void {
    this.router.navigate(['card',item.id],{relativeTo: this.route})
  }
}
