import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule, AccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  faqList = [
    {
      question: 'Как происходит замер?',
      answer: 'Наш специалист приедет на объект, произведет все необходимые замеры и согласует детали.'
    },
    {
      question: 'Сколько времени занимает установка?',
      answer: 'Установка занимает от 2 до 5 часов в зависимости от сложности конструкции.'
    },
    {
      question: 'Вы работаете по договору?',
      answer: 'Да, мы заключаем официальный договор перед началом работ.'
    }
  ];
}
