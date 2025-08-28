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
  phone = '+7 (123) 456-78-90';
  phoneTel = '+71234567890'; // для tel:
  email = 'info@designstudio.ru';
  // можно Google Maps, можно Яндекс. Ниже пример для Яндекс.Карт по адресу из макета:
  mapUrl = 'https://yandex.ru/maps/?mode=search&text=Москва,%20ул.%20Дизайнеров,%2015';
  public encodeURIComponent = encodeURIComponent;
}
