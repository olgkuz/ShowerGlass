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
    { image: 'assets/img/examples/example2.jpg', title: 'Душевая раздвижные двери с угла тонированное стекло' },
    { image: 'assets/img/examples/example3.jpg', title: 'Душевая с распашной дверью' },
    { image: 'assets/img/examples/example4.jpg', title: 'Душевая трапециевидная' },
    { image: 'assets/img/examples/example5.jpg', title: 'Душевое ограждение с дверью под углом 45 градусов' },
    { image: 'assets/img/examples/example6.jpg', title: 'Ограждение на ванну' },
    { image: 'assets/img/examples/example7.jpg', title: 'Угловое душевое ограждение' },
    { image: 'assets/img/examples/example8.jpg', title: 'Душевое ограждение в нишу' },
    { image: 'assets/img/examples/example9.jpg', title: 'Душеове ограждение Slash' }
  ];

  // Адаптивная настройка для p-carousel
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}


