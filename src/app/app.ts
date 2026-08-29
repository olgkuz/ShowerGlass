import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AsyncPipe, CommonModule } from '@angular/common';
import { asapScheduler, Observable, observeOn } from 'rxjs';
import { Router } from '@angular/router';
import { MetrikaService } from './services/metrika.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerModule, AsyncPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Душевые из стекла на заказ';
  loader$: Observable<boolean>;

  constructor(
    private loaderService: LoaderService,
    router: Router,
    metrika: MetrikaService
) {
  this.loader$ = this.loaderService.loader$.pipe(observeOn(asapScheduler));
  metrika.startPageViewTracking(router);
}}
