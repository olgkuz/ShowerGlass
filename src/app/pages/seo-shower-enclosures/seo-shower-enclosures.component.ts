import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContactformComponent } from '../home/contactform/contactform.component';

type WorkImage = {
  image: string;
  alt: string;
  title?: string;
  text?: string;
};

type PriceRow = {
  product: string;
  details: string;
  price: string;
};

@Component({
  selector: 'app-seo-shower-enclosures',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, ContactformComponent],
  templateUrl: './seo-shower-enclosures.component.html',
  styleUrl: './seo-shower-enclosures.component.scss'
})
export class SeoShowerEnclosuresComponent implements OnInit, OnDestroy {
  readonly canonicalUrl = 'https://www.steklodush-spb.ru/dushevye-ograzhdeniya-na-zakaz-spb';

  readonly workImages: WorkImage[] = [
    {
      image: 'assets/img/seo-works/work-1.jpg',
      alt: 'Душевые ограждения на заказ из стекла',
      title: 'Душевые ограждения на заказ',
      text: 'Изготавливаем душевые двери, душевые ограждения в проем, душевые уголки и стеклянные ограждения на ванну по индивидуальным размерам для квартир, домов и офисов в Санкт-Петербурге.'
    },
    {
      image: 'assets/img/seo-works/work-2.jpg',
      alt: 'Душевые ограждения нестандартных размеров с черной фурнитурой',
      title: 'Душевые нестандартных размеров',
      text: 'Производим душевые ограждения нестандартных размеров: пятиугольные душевые, душевые с вырезом под инсталляцию, стеклянные ограждения на ванну и решения для сложных проемов. Изготовление и монтаж в Санкт-Петербурге.'
    },
    {
      image: 'assets/img/seo-works/work-3.jpg',
      alt: 'Перегородки из стекла на заказ с откатными дверьми',
      title: 'Перегородки из стекла на заказ',
      text: 'Изготавливаем перегородки с откатными дверьми из закаленного стекла для квартир, домов и офисов. Межкомнатные стеклянные перегородки производим по индивидуальным размерам в Санкт-Петербурге.'
    },
    {
      image: 'assets/img/seo-works/work-4.jpg',
      alt: 'Лестничные и балюстрадные ограждения из стекла',
      title: 'Лестничные и балюстрадные ограждения из стекла',
      text: 'Изготавливаем ограждения для лестниц из закаленного триплекса по размерам на заказ для квартир и загородных домов. Подбираем конструкцию, фурнитуру и способ крепления под интерьер.'
    },
    {
      image: 'assets/img/seo-works/work-5.jpg',
      alt: 'Двери из закаленного стекла на заказ',
      title: 'Двери из закаленного стекла',
      text: 'Изготавливаем межкомнатные двери из закаленного стекла, стеклянные двери для сауны, бани и санузла. Делаем откатные и распашные двери по размерам на заказ.'
    },
    {
      image: 'assets/img/seo-works/work-6.jpg',
      alt: 'Стеклянные перегородки из закаленного стекла',
      title: 'Стеклянные перегородки',
      text: 'Межкомнатные перегородки из закаленного стекла, входные группы в гардеробную и стеклянные тамбуры делаем на заказ по индивидуальным размерам.'
    }
  ];

  readonly priceRows: PriceRow[] = [
    {
      product: 'Душевая дверь в нишу',
      details: 'Стекло 8 мм, базовая фурнитура, изготовление по размеру',
      price: 'от 32 000 ₽'
    },
    {
      product: 'Угловое душевое ограждение',
      details: 'Две стеклянные стороны, петли, ручка, профиль или крепления',
      price: 'от 60 000 ₽'
    },
    {
      product: 'Раздвижная душевая система',
      details: 'Система направляющих, закаленное стекло, монтаж на объекте',
      price: 'от 45 000 ₽'
    },
    {
      product: 'Шторка на ванну из стекла',
      details: 'Одна или несколько секций, подбор открывания и фурнитуры',
      price: 'от 28 000 ₽'
    }
  ];

  readonly steps = [
    'Консультация и предварительный расчет',
    'Выезд мастера на точный замер',
    'Согласование стекла, фурнитуры и эскиза',
    'Подписание договора и внесение предоплаты',
    'Изготовление закаленного стекла',
    'Доставка и аккуратный монтаж',
    'Проверка конструкции и гарантия'
  ];

  readonly schemaJson = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'СтеклоДуш СПб',
      url: 'https://www.steklodush-spb.ru',
      image: 'https://www.steklodush-spb.ru/assets/img/main-banner-desktop.jpg',
      telephone: '+7-911-029-30-30',
      areaServed: ['Санкт-Петербург', 'Ленинградская область'],
      priceRange: '₽₽'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Душевые ограждения на заказ в СПб',
      serviceType: 'Изготовление и монтаж душевых ограждений из стекла',
      provider: {
        '@type': 'LocalBusiness',
        name: 'СтеклоДуш СПб'
      },
      areaServed: {
        '@type': 'City',
        name: 'Санкт-Петербург'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: 'https://www.steklodush-spb.ru/home'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Душевые ограждения на заказ в СПб',
          item: this.canonicalUrl
        }
      ]
    }
  ]);

  private canonicalElement?: HTMLLinkElement;
  private schemaElement?: HTMLScriptElement;

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Душевые ограждения на заказ в СПб | СтеклоДуш');
    this.meta.updateTag({
      name: 'description',
      content: 'Душевые ограждения из закаленного стекла на заказ в Санкт-Петербурге. Замер, изготовление по размерам, доставка, монтаж и гарантия.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'душевые ограждения на заказ спб, стеклянные душевые ограждения, душевые двери из стекла, душевые перегородки спб'
    });
    this.setCanonical();
    this.setStructuredData();
  }

  ngOnDestroy(): void {
    this.canonicalElement?.remove();
    this.schemaElement?.remove();
  }

  private setCanonical(): void {
    this.canonicalElement =
      this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
      this.document.createElement('link');
    this.canonicalElement.setAttribute('rel', 'canonical');
    this.canonicalElement.setAttribute('href', this.canonicalUrl);

    if (!this.canonicalElement.parentNode) {
      this.document.head.appendChild(this.canonicalElement);
    }
  }

  private setStructuredData(): void {
    this.schemaElement = this.document.createElement('script');
    this.schemaElement.type = 'application/ld+json';
    this.schemaElement.text = this.schemaJson;
    this.document.head.appendChild(this.schemaElement);
  }
}
