import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import  {MenuItem } from 'primeng/api'
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [
    MenubarModule, 
    ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  
})
export class HeaderComponent implements OnInit,OnDestroy { 


  menuItems: MenuItem []=[];
  user:IUser;
  logoutIcon ='pi pi-user';

  constructor(
    private userService: UserService, 
    private router: Router, 
    )  {}
   

  ngOnInit(): void {

  

    this.user =  this.userService.getUser();
    this.menuItems = this.initMenuItems();

    
     
  }
  ngOnDestroy(){}

initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Галерея',
        routerLink: ['/gallery']
      },
      {
        label: 'Информация',
        routerLink: ['/blog']
      },
      {
        label: 'Дизайнерам',
        routerLink: ['/desauth']
      }
    ];
}

  logOut(): void {
  this.userService.setUser(null, true);   
  this.router.navigate(['/home']);
}


   hoverLogoutBtn(val: boolean): void {
   this.logoutIcon =val ? 'pi pi-sign-out' : 'pi pi-user'
}

  
}