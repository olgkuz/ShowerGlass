import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
     InputGroupModule ,
    InputGroupAddonModule 
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    console.log('Форма отправлена:', this.contactForm);
    alert('Форма успешно отправлена!');
    this.contactForm = { name: '', email: '', message: '' };
  }
}