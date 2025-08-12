import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerModule, AsyncPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ShowerGlass';
  loader$: Observable<boolean>;

  constructor(
  private loaderService: LoaderService,
  private cdr: ChangeDetectorRef 
) {
  this.loader$ = this.loaderService.loader$.pipe(
    tap(() => this.cdr.detectChanges()) // ← принудительно проверяем изменения
  );
}}