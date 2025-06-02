import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';





@Component({
  selector: 'app-layout',
  imports: [
      RouterModule,
       FooterComponent,
       HeaderComponent, 
       
       
      
      ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy{ 
   
  
 

  constructor ( private router:Router ) {}

  ngOnInit(): void {

 
  }
 
    ngOnDestroy ():void {
      
    }
  }
