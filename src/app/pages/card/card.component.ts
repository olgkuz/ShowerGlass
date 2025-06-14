import { Component, OnInit } from '@angular/core';
import { ICards } from '../../models/cards';
import { CardsService } from '../../services/cards.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  imports: [ ButtonModule,
    CardModule,
    RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit{ 

  cardId:string ;
  card:ICards ;
  
  constructor(
    private cardService: CardsService, 
    private route:ActivatedRoute,
    private router:Router
   ){}

  ngOnInit():void {
    this.cardId = this.route.snapshot.paramMap.get('id');
    this.cardService.getCardById(this.cardId).subscribe((card)=>{
  
    this.card = card;
 
  });
}
 
}
