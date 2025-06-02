import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';




@Component({
  selector: 'app-reg',
  imports: [NgClass,FormsModule, ButtonModule, CheckboxModule, InputTextModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
})
export class RegComponent implements OnInit { 
  login:string = null;
  password: string;
  repeatPassword: string;
  email: string;
  isRemember: boolean;
  labelText = 'Сохранить пользователя в хранилище';
  constructor(private userService:UserService) {}
  
  

  
  ngOnInit(): void {
    
  }
  onAuth(ev:Event): void {
    

  }
 
                  
}