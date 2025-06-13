import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    FooterComponent,
    HeaderComponent,
    AsideComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  showAside = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateAside(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateAside(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {}

  private updateAside(url: string): void {
    // Показываем aside только на /card/:id
    this.showAside = /^\/card\/[^/]+$/.test(url);
  }
}
