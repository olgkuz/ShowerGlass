import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MetrikaService } from '../../services/metrika.service';
import { ContactformComponent } from '../home/contactform/contactform.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ContactformComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  phone = '+7 (911) 029-30-30';
  phoneTel = '+79110293030';
  email = 'mail@customglass.ru';
  mapUrl = 'https://yandex.ru/maps/?mode=search&text=Санкт-Петербург,%20ул.%20Железноводская,%203';
  public encodeURIComponent = encodeURIComponent;

  constructor(private readonly metrika: MetrikaService) {}

  trackGoal(target: string): void {
    this.metrika.reachGoal(target);
  }
}
