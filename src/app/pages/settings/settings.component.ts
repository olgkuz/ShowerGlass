import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { ArticleuploadComponent } from './articleupload/articleupload.component';
import { PhotouploadComponent } from './photoupload/photoupload.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, TabViewModule, ButtonModule, ArticleuploadComponent, PhotouploadComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  user: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser(); 
  }
}
