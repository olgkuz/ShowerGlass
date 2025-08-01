import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

interface ICard {
  id: string;
  name: string;
  description: string;
  img?: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  cards: ICard[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ICard[]>(`${this.apiUrl}/cards`).subscribe({
      next: (res) => {
        this.cards = res;
      },
      error: (err) => {
        console.error('Ошибка при получении карточек:', err);
      }
    });
  }
}
