import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../models/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  imports: [NgClass,FormsModule, ButtonModule,CheckboxModule,InputTextModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy { 

  login:string ;
  password: string;
 

constructor(private userService:UserService,
private router: Router) { }


ngOnInit(): void {}

ngOnDestroy(): void {}

onAuth(): void {
const user:IUser = {
  login: this.login,
  password:this.password,
}
this.userService.authUser(user);
this.router.navigate(['designer']);
 }
}
