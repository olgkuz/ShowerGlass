import { Component, OnInit } from '@angular/core';
import { ICards } from '../../models/cards';
import { CardsService } from '../../services/cards.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  card: ICards | null = null;

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
          this.card = data;
        },
        error: (err) => {
          console.error('Ошибка загрузки карточки:', err);
          this.card = null;
        }
      });
    } else {
      this.card = null;
    }
  }
}



