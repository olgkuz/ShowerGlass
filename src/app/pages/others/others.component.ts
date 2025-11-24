import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { OthersService } from '../../services/other.service';
import { IOther } from '../../models/other';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  loading = true;
  items: IOther[] = [];

  constructor(private service: OthersService, private router: Router) {}

  ngOnInit(): void {
    this.service.getOthers().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goTo(item: IOther) {
    this.router.navigate(['/other', item.id]);
  }

  onImgError(event: Event, item: IOther) {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl || imgEl.dataset['fallbackApplied'] === '1') return;
    imgEl.dataset['fallbackApplied'] = '1';
    if (item.imgUrl) {
      imgEl.src = item.imgUrl;
    }
  }
}
