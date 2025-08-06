import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IGalleryCard } from '../../models/gallery-card';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  cards: IGalleryCard[] = [];
  selectedImgUrl: string | null = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.getCards().subscribe({
      next: (res) => this.cards = res,
      error: (err) => console.error('Ошибка при получении карточек галереи:', err)
    });
  }

  openImage(imgUrl: string): void {
    this.selectedImgUrl = imgUrl;
  }

  closeImage(): void {
    this.selectedImgUrl = null;
  }
}




