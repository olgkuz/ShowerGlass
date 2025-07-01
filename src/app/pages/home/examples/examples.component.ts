import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

interface ExampleItem {
  image: string;
  title: string;
}

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent {
 examples: ExampleItem[] = [
  { image: 'assets/img/examples/example1.jpg', title: 'Душевая с откатной дверью Piuma' },
  { image: 'assets/img/examples/example2.jpg', title: 'Дшевая раздвижные двери с угла' },
  { image: 'assets/img/examples/example3.jpg', title: 'Душевая с распашной дверью ' }
];

}
