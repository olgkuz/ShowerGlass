import { Component, OnInit, HostListener, Renderer2, OnDestroy } from '@angular/core';
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
export class GalleryComponent implements OnInit, OnDestroy {
  cards: IGalleryCard[] = [];
  selectedImgUrl: string | null = null;

  constructor(
    private galleryService: GalleryService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.galleryService.getCards().subscribe({
      next: (res) => (this.cards = res),
      error: (err) => console.error('Ошибка при получении карточек галереи:', err),
    });
  }

  ngOnDestroy(): void {
    // На всякий случай снимаем блокировку скролла, если компонент размонтируется с открытым оверлеем
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  openImage(imgUrl: string): void {
    this.selectedImgUrl = imgUrl;
    this.renderer.addClass(document.body, 'no-scroll'); // блокируем скролл под оверлеем
  }

  closeImage(): void {
    this.selectedImgUrl = null;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  // Закрытие по Esc
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.selectedImgUrl) this.closeImage();
  }
}
