import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.scss'
})
export class DesignerComponent {
  orders = [
    { number: 1, address: 'г. Москва, ул. Ленина, д. 12', contractSum: '150 000 ₽', bonus: '15 000 ₽' },
    { number: 2, address: 'г. Химки, ул. Победы, д. 7', contractSum: '90 000 ₽', bonus: '9 000 ₽' },
    { number: 3, address: 'г. Москва, ул. Арбат, д. 25', contractSum: '200 000 ₽', bonus: '20 000 ₽' },
    { number: 4, address: 'г. Одинцово, ул. Гагарина, д. 5', contractSum: '120 000 ₽', bonus: '12 000 ₽' }
  ];

  constructor(
    private router: Router,
    private userService: UserService 
  ) {}

  logout() {
    this.userService.logout(); 
    this.router.navigateByUrl('/home');
  }
}

