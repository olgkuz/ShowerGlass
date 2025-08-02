import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { environment } from '../../../environments/environment.development';

interface ICard {
  id: string;
  name: string;
  description: string;
  img?: string;
  imgUrl?: string; // ← получаем уже готовый URL от сервера
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  cards: ICard[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ICard[]>(`${environment.apiUrl}/cards`).subscribe({
      next: (res) => {
        this.cards = res;
      },
      error: (err) => {
        console.error('Ошибка при получении карточек:', err);
      }
    });
  }
}


