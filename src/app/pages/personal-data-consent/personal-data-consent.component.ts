import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-data-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-data-consent.component.html',
  styleUrls: ['../privacypolicy/privacyPolicy.component.scss'],
})
export class PersonalDataConsentComponent {}
