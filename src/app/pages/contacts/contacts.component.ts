import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';


// ⚠️ проверь путь импорта — поставь тот, где лежит твой ContactformComponent
import { ContactformComponent } from '../home/contactform/contactform.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ContactformComponent, // ← вставляем готовую форму как вложенный компонент
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  phone = '+7 (911) 029-30-30';
  phoneTel = '+79110293030'; // для tel:
  email = 'mail@customglass.ru';
  // можно Google Maps, можно Яндекс. Ниже пример для Яндекс.Карт по адресу из макета:
  mapUrl = 'https://yandex.ru/maps/?mode=search&text=Санкт-Петербург,%20ул.%20Железноводская,%203';
  public encodeURIComponent = encodeURIComponent;
}
