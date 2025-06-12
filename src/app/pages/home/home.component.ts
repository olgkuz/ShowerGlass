import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { CardsComponent } from './cards/cards.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ContactformComponent } from './contactform/contactform.component';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-home',
  imports: [MainComponent,HeroComponent,
    CardsComponent,
    AccordionComponent,
    ContactformComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent { }
