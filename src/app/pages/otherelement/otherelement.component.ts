import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IOther } from '../../models/other';
import { OthersService } from '../../services/other.service';

@Component({
  selector: 'app-otherelement',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './otherelement.component.html',
  styleUrls: ['./otherelement.component.scss']
})
export class OtherElementComponent implements OnInit {
  loading = true;
  item: IOther | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OthersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/others']);
      return;
    }

    this.service.getOtherById(id).subscribe({
      next: (data) => {
        this.item = data ?? null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getTelegramLink(): string {
    const baseUrl = 'https://t.me/+79110293030';
    const name = this.item?.name?.trim();
    const text = name
      ? `Здравствуйте! Интересует товар: ${name}`
      : 'Здравствуйте! Интересует товар.';
    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  }

  onImgError(event: Event) {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl || imgEl.dataset['fallbackApplied'] === '1') return;
    imgEl.dataset['fallbackApplied'] = '1';
    if (this.item?.imgUrl) {
      imgEl.src = this.item.imgUrl;
    }
  }
}
