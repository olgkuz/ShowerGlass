import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../environments/environment';
import { ICards } from '../../models/cards';
import { CardsService } from '../../services/cards.service';

type SelectOption = {
  id: string;
  label: string;
  subtitle?: string;
  hex?: string;
  image?: string;
};

type DimensionField = {
  key: string;
  label: string;
  min?: number;
  max?: number;
  required?: boolean;
};

type CardConfigurator = {
  glassColors: SelectOption[];
  glassFinishes: SelectOption[];
  hardwareColors: SelectOption[];
  hingeOptions: SelectOption[];
  handleOptions: SelectOption[];
  installationOptions: SelectOption[];
  dimensions: DimensionField[];
};

type HardwareDetail = {
  title: string;
  description: string[];
  variantsTitle?: string;
  variants?: SelectOption[];
  selectableVariants?: boolean;
  variantControl?: 'knobVariant' | 'barVariant' | 'towelHolderVariant';
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, ProgressSpinnerModule, ReactiveFormsModule, ToastModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  card: ICards | null = null;
  loading = true;
  isLightboxOpen = false;
  lightboxImage = '';
  activeHardwareDetail: HardwareDetail | null = null;
  activeHardwareDetailId = '';
  isEmailEstimateOpen = false;
  isEmailEstimateSending = false;

  currentConfig: CardConfigurator | null = null;
  readonly phonePattern = '^[0-9+() -]+$';

  readonly configForm = new FormGroup({
    glassColor: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    glassFinish: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    hardwareColor: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    hingeOption: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    handleOption: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    knobVariant: new FormControl<string>('', { nonNullable: true }),
    barVariant: new FormControl<string>('', { nonNullable: true }),
    towelHolderVariant: new FormControl<string>('', { nonNullable: true }),
    installationOption: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dimensions: new FormGroup({})
  });

  readonly emailEstimateForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.phonePattern)]
    }),
    comment: new FormControl('', { nonNullable: true }),
    consent: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  });

  private readonly contactEndpoint =
    environment.contactEndpoint ?? `${environment.apiUrl}/contact`;

  private readonly defaultGlassColors: SelectOption[] = [
    { id: 'clear', label: 'Прозрачное' },
    { id: 'optiwhite', label: 'Осветленное' },
    { id: 'graphite', label: 'Графит' },
    { id: 'bronze', label: 'Бронза' }
  ];

  private readonly defaultGlassFinishes: SelectOption[] = [
    { id: 'transparent', label: 'Прозрачное' },
    { id: 'frosted', label: 'Матовое' }
  ];

  private readonly defaultHardwareColors: SelectOption[] = [
    { id: 'chrome', label: 'Хром', hex: '#D9D9D9' },
    { id: 'matte-stainless', label: 'Матовая нержавейка', hex: '#B6B6B6' },
    { id: 'matte-black', label: 'Матовый черный', hex: '#2B2B2B' },
    { id: 'matte-white', label: 'Матовый белый', hex: '#F4F4F4' },
    { id: 'gold', label: 'Золото', hex: '#C9A14A' },
    { id: 'matte-gold', label: 'Матовое золото', hex: '#A0853A' },
    { id: 'bronze', label: 'Бронза', hex: '#8F6A48' },
    { id: 'gunmetal', label: 'Оружейная сталь', hex: '#555A63' },
    { id: 'rose-gold', label: 'Розовое золото', hex: '#E6B8A2' },
    { id: 'matte-rose-gold', label: 'Матовое розовое золото', hex: '#C99B7A' }
  ];

  private readonly defaultHingeOptions: SelectOption[] = [
    { id: 'classic', label: 'Премиум', image: 'assets/img/cards/hinges/hinge-classic.png' },
    { id: 'flat', label: 'Усиленная', image: 'assets/img/cards/hinges/hinge-flat.png' },
    { id: 'reinforced', label: 'Классическая', image: 'assets/img/cards/hinges/hinge-reinforced.png' }
  ];

  private readonly defaultHandleOptions: SelectOption[] = [
    { id: 'knob', label: 'Ручка-кноб', image: 'assets/img/cards/handles/knob/knob-kvadrat.png' },
    { id: 'bar', label: 'Ручка-скоба', image: 'assets/img/cards/handles/bar/bar-main.png' },
    { id: 'towel-holder', label: 'Ручка-держатель полотенца', image: 'assets/img/cards/handles/towel-holder/towel-holder-main.png' }
  ];

  private readonly handleOptionsByCardId: Record<string, SelectOption[]> = {
    '6': [
      { id: 'knob', label: 'Ручка-кноб', image: 'assets/img/cards/handles/knob/knob-kvadrat.png' },
      { id: 'bar', label: 'Ручка-скоба', image: 'assets/img/cards/handles/bar/bar-main.png' },
      { id: 'towel-holder', label: 'Ручка-держатель полотенца', image: 'assets/img/cards/handles/towel-holder/towel-holder-main.png' }
    ]
  };

  private readonly hingeOptionsByCardId: Record<string, SelectOption[]> = {
    '2': [
      { id: 'proem-hinge-premium', label: 'Премиум', image: 'assets/img/cards/hinges/hinge-classic.png' },
      { id: 'proem-hinge-reinforced', label: 'Усиленная', image: 'assets/img/cards/hinges/hinge-flat.png' },
      { id: 'proem-hinge-classic', label: 'Классическая', image: 'assets/img/cards/hinges/hinge-reinforced.png' }
    ],
    '3': [
      { id: 'corner-hinge-premium', label: 'Премиум', image: 'assets/img/cards/hinges/hinge-classic.png' },
      { id: 'corner-hinge-reinforced', label: 'Усиленная', image: 'assets/img/cards/hinges/hinge-flat.png' },
      { id: 'corner-hinge-classic', label: 'Классическая', image: 'assets/img/cards/hinges/hinge-reinforced.png' }
    ],
    '4': [
      { id: 'trapeze-hinge-premium', label: 'Премиум', image: 'assets/img/cards/trapeze/hinges/premium/main.png' },
      { id: 'trapeze-hinge-reinforced', label: 'Усиленная', image: 'assets/img/cards/trapeze/hinges/reinforced/main.png' },
      { id: 'trapeze-hinge-classic', label: 'Классическая', image: 'assets/img/cards/trapeze/hinges/classic/main.png' }
    ],
    '6': []
  };

  private readonly hardwareDetailsById: Record<string, HardwareDetail> = {
    classic: {
      title: 'Петля Премиум',
      description: [
        'Квадратный дизайн.',
        'Для дверей стеклянных душевых перегородок и ограждений.',
        'Открывание двери на 180 градусов.',
        'Регулировка 0° положения.',
        'Функция самозакрывания от 25 градусов.',
        'Фиксация в закрытом положении.',
        'Максимальная нагрузка на две петли: 45 кг.',
        'Максимальная ширина полотна: 850 мм.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        { id: 'wall-glass-90', label: 'Стена-стекло 90°', image: 'assets/img/cards/hinges/premium/wall-90.png' },
        { id: 'wall-glass-180', label: 'Стена-стекло 180°', image: 'assets/img/cards/hinges/premium/wall-180.png' }
      ]
    },
    flat: {
      title: 'Петля Усиленная',
      description: [
        'Для дверей стеклянных душевых перегородок и ограждений.',
        'Открывание двери на 180 градусов.',
        'Регулировка 0° положения.',
        'Функция самозакрывания от 25 градусов.',
        'Фиксация в закрытом положении.',
        'Максимальная нагрузка на две петли: 45 кг.',
        'Максимальная ширина полотна: 850 мм.'
      ]
    },
    reinforced: {
      title: 'Петля Классическая',
      description: [
        'Для дверей стеклянных душевых перегородок и ограждений.',
        'Открывание двери на 180 градусов.',
        'Максимальная нагрузка на две петли: 40 кг.',
        'Максимальный размер полотна: 760 х 2000 мм.'
      ]
    },
    knob: {
      title: 'Ручка-кноб',
      description: [
        'Компактная ручка для стеклянных дверей душевых перегородок и ограждений.',
        'Подходит для минималистичных конструкций, где важно сохранить аккуратный внешний вид.',
        'Тип и размер ручки подбираются с учетом толщины стекла и конструкции двери.'
      ],
      variantsTitle: 'Варианты ручки-кноб',
      selectableVariants: true,
      variantControl: 'knobVariant',
      variants: [
        { id: 'knob-1', label: 'Кноб 1', image: 'assets/img/cards/handles/knob/konb-1.png' },
        { id: 'knob-2', label: 'Кноб 2', image: 'assets/img/cards/handles/knob/konb-2.png' },
        { id: 'knob-3', label: 'Кноб 3', image: 'assets/img/cards/handles/knob/konb-3.png' },
        { id: 'knob-4', label: 'Кноб 4', image: 'assets/img/cards/handles/knob/konb-4.png' }
      ]
    },
    bar: {
      title: 'Ручка-скоба',
      description: [
        'Классический вариант ручки для стеклянных дверей душевых перегородок.',
        'Удобна для ежедневного использования и хорошо подходит для распашных дверей.',
        'Длина, форма и цвет ручки подбираются под выбранную фурнитуру.'
      ],
      variantsTitle: 'Варианты ручки-скобы',
      selectableVariants: true,
      variantControl: 'barVariant',
      variants: [
        { id: 'bar-1', label: 'Скоба 1', image: 'assets/img/cards/handles/bar/bar-1.png' },
        { id: 'bar-2', label: 'Скоба 2', image: 'assets/img/cards/handles/bar/bar-2.png' },
        { id: 'bar-3', label: 'Скоба 3', image: 'assets/img/cards/handles/bar/bar-3.png' },
        { id: 'bar-4', label: 'Скоба 4', image: 'assets/img/cards/handles/bar/bar-4.png' }
      ]
    },
    'towel-holder': {
      title: 'Ручка-держатель полотенца',
      description: [
        'Ручка совмещает функцию открывания двери и держателя полотенца.',
        'Подходит для душевых ограждений, где нужно рационально использовать пространство.',
        'Размер и исполнение подбираются индивидуально под конструкцию и цвет фурнитуры.'
      ],
      variantsTitle: 'Варианты ручки-держателя полотенца',
      selectableVariants: true,
      variantControl: 'towelHolderVariant',
      variants: [
        { id: 'towel-holder-1', label: 'Держатель 1', image: 'assets/img/cards/handles/towel-holder/towel-holder-1.png' },
        { id: 'towel-holder-2', label: 'Держатель 2', image: 'assets/img/cards/handles/towel-holder/towel-holder-2.png' },
        { id: 'towel-holder-3', label: 'Держатель 3', image: 'assets/img/cards/handles/towel-holder/towel-holder-3.png' },
        { id: 'towel-holder-4', label: 'Держатель 4', image: 'assets/img/cards/handles/towel-holder/towel-holder-4.png' }
      ]
    },
    'proem-hinge-premium': {
      title: 'Петля Премиум',
      description: [
        'Описание петли для душевой в проем будет добавлено после уточнения модели.',
        'Для сложных конструкций петли подбираются индивидуально.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        {
          id: 'proem-premium-variant-1',
          label: 'Вариант 1',
          subtitle: 'Стекло-стена 90°',
          image: 'assets/img/cards/hinges/premium/wall-90.png'
        },
        {
          id: 'proem-premium-glass-180',
          label: 'Вариант 2',
          subtitle: 'Стекло-стекло 180°',
          image: 'assets/img/cards/proem/hinges/premium/glass-180.png'
        }
      ]
    },
    'corner-hinge-premium': {
      title: 'Петля Премиум',
      description: [
        'Описание петли для душевого уголка будет добавлено после уточнения модели.',
        'Для сложных конструкций петли подбираются индивидуально.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        {
          id: 'corner-premium-variant-1',
          label: 'Вариант 1',
          subtitle: 'Стекло-стена 90°',
          image: 'assets/img/cards/hinges/premium/wall-90.png'
        },
        {
          id: 'corner-premium-glass-180',
          label: 'Вариант 2',
          subtitle: 'Стекло-стекло 180°',
          image: 'assets/img/cards/proem/hinges/premium/glass-180.png'
        },
        {
          id: 'corner-premium-glass-glass-90',
          label: 'Вариант 3',
          subtitle: 'Стекло-стекло 90°',
          image: 'assets/img/cards/corner/hinges/premium/glass-glass-90.png?v=corner-premium-90'
        }
      ]
    },
    'proem-hinge-reinforced': {
      title: 'Петля Усиленная',
      description: [
        'Описание усиленной петли для душевой в проем будет добавлено после уточнения модели.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        {
          id: 'proem-reinforced-glass-180',
          label: 'Вариант 1',
          subtitle: 'Стекло-стекло 180°',
          image: 'assets/img/cards/proem/hinges/reinforced/glass-180.png'
        }
      ]
    },
    'corner-hinge-reinforced': {
      title: 'Петля Усиленная',
      description: [
        'Описание усиленной петли для душевого уголка будет добавлено после уточнения модели.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        {
          id: 'corner-reinforced-glass-180',
          label: 'Вариант 1',
          subtitle: 'Стекло-стекло 180°',
          image: 'assets/img/cards/proem/hinges/reinforced/glass-180.png'
        },
        {
          id: 'corner-reinforced-glass-glass-90',
          label: 'Вариант 2',
          subtitle: 'Стекло-стекло 90°',
          image: 'assets/img/cards/corner/hinges/reinforced/glass-glass-90.png?v=corner-reinforced-90'
        }
      ]
    },
    'proem-hinge-classic': {
      title: 'Петля Классическая',
      description: [
        'Описание классической петли для душевой в проем будет добавлено после уточнения модели.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        {
          id: 'proem-classic-glass-180',
          label: 'Вариант 1',
          subtitle: 'Стекло-стекло 180°',
          image: 'assets/img/cards/proem/hinges/classic/glass-180.png'
        }
      ]
    },
    'corner-hinge-classic': {
      title: 'Петля Классическая',
      description: [
        'Описание классической петли для душевого уголка будет добавлено после уточнения модели.'
      ],
      variantsTitle: 'Варианты крепления петель',
      variants: [
        {
          id: 'corner-classic-glass-180',
          label: 'Вариант 1',
          subtitle: 'Стекло-стекло 180°',
          image: 'assets/img/cards/proem/hinges/classic/glass-180.png'
        },
        {
          id: 'corner-classic-glass-glass-90',
          label: 'Вариант 2',
          subtitle: 'Стекло-стекло 90°',
          image: 'assets/img/cards/corner/hinges/classic/glass-glass-90.png?v=corner-classic-90'
        }
      ]
    },
    'trapeze-hinge-premium': {
      title: 'Петля Премиум',
      description: [
        'Квадратный дизайн.',
        'Для дверей стеклянных душевых перегородок и ограждений.',
        'Открывание двери на 180 градусов.',
        'Регулировка 0° положения.',
        'Функция самозакрывания от 25 градусов.',
        'Фиксация в закрытом положении.',
        'Максимальная нагрузка на две петли: 45 кг.',
        'Максимальная ширина полотна: 850 мм.'
      ]
    },
    'trapeze-hinge-reinforced': {
      title: 'Петля Усиленная',
      description: [
        'Для дверей стеклянных душевых перегородок и ограждений.',
        'Открывание двери на 180 градусов.',
        'Регулировка 0° положения.',
        'Функция самозакрывания от 25 градусов.',
        'Фиксация в закрытом положении.',
        'Максимальная нагрузка на две петли: 45 кг.',
        'Максимальная ширина полотна: 850 мм.'
      ]
    },
    'trapeze-hinge-classic': {
      title: 'Петля Классическая',
      description: [
        'Для дверей стеклянных душевых перегородок и ограждений.',
        'Открывание двери на 180 градусов.',
        'Максимальная нагрузка на две петли: 40 кг.',
        'Максимальный размер полотна: 760 х 2000 мм.'
      ]
    },
    
  };

  private readonly installationOptionsByCardId: Record<string, SelectOption[]> = {
    '1': [
      { id: 'door-1', label: 'Вариант 1', image: 'assets/img/cards/door.jpg' },
      { id: 'door-2', label: 'Вариант 2', image: 'assets/img/cards/door/variant1.jpg' },
      { id: 'door-3', label: 'Вариант 3', image: 'assets/img/cards/door/variant2.jpg' }
    ],
    '2': [
      { id: 'proen-1', label: 'Вариант 1', image: 'assets/img/cards/proem.jpg' },
      { id: 'proen-2', label: 'Вариант 2', image: 'assets/img/cards/proen/variant1.jpg' },
      { id: 'proen-3', label: 'Вариант 3', image: 'assets/img/cards/proen/variant2.jpg' }
    ],
    '3': [
      { id: 'corner-1', label: 'Вариант 1', image: 'assets/img/cards/corner.jpg' },
      { id: 'corner-2', label: 'Вариант 2', image: 'assets/img/cards/corner/variant1.jpg' },
      { id: 'corner-3', label: 'Вариант 3', image: 'assets/img/cards/corner/variant2.jpg' },
      { id: 'corner-4', label: 'Вариант 4', image: 'assets/img/cards/corner/variant3.jpg' }
    ],
    '4': [
      { id: 'trapeze-1', label: 'Вариант 1', image: 'assets/img/cards/trapeze.jpg' },
      { id: 'trapeze-2', label: 'Вариант 2', image: 'assets/img/cards/trapeze/variant1.jpg' },
      { id: 'trapeze-3', label: 'Вариант 3', image: 'assets/img/cards/trapeze/variant2.jpg' }
    ],
    '5': [
      { id: 'sliding-1', label: 'Вариант 1', image: 'assets/img/cards/sliding.jpg' },
      { id: 'sliding-2', label: 'Вариант 2', image: 'assets/img/cards/sliding/variant1.jpg' },
      { id: 'sliding-3', label: 'Вариант 3', image: 'assets/img/cards/sliding/variant2.jpg' }
    ],
    '6': [
      { id: 'slash-1', label: 'Вариант 1', image: 'assets/img/cards/slash/variant1.jpg' },
      { id: 'slash-2', label: 'Вариант 2', image: 'assets/img/cards/slash/variant2.jpg' }
    ]
  };

  private readonly dimensionsByCardId: Record<string, DimensionField[]> = {
    '1': [
      { key: 'width', label: 'Ширина двери, мм', min: 500, max: 1200 },
      { key: 'height', label: 'Высота двери, мм', min: 1600, max: 3000 }
    ],
    '2': [
      { key: 'openingWidth', label: 'Ширина проема, мм', min: 500, max: 3000 },
      { key: 'openingHeight', label: 'Высота проема, мм', min: 1600, max: 3000 }
    ],
    '3': [
      { key: 'leftSide', label: 'Левая сторона, мм', min: 500, max: 3000 },
      { key: 'rightSide', label: 'Правая сторона, мм', min: 500, max: 3000 },
      { key: 'height', label: 'Высота, мм', min: 1600, max: 3000 }
    ],
    '4': [
      { key: 'frontSide', label: 'Фасадная сторона, мм', min: 600, max: 3000 },
      { key: 'sidePart', label: 'Боковая часть, мм', min: 300, max: 2000 },
      { key: 'height', label: 'Высота, мм', min: 1600, max: 3000 }
    ],
    '5': [
      { key: 'systemWidth', label: 'Ширина системы, мм', min: 1200, max: 3000 },
      { key: 'height', label: 'Высота, мм', min: 1600, max: 2800 },
      { key: 'depth', label: 'Глубина, мм', min: 300, max: 2000, required: false }
    ],
    '6': [
      { key: 'systemWidth', label: 'Ширина системы, мм', min: 900, max: 2800 },
      { key: 'height', label: 'Высота, мм', min: 1600, max: 3000 },
      { key: 'depth', label: 'Глубина, мм', min: 300, max: 2000, required: false }
    ],
    '7': [
      { key: 'openingWidth', label: 'Ширина проема, мм', min: 1200, max: 3000 },
      { key: 'height', label: 'Высота, мм', min: 1600, max: 3000 }
    ],
    '8': [
      { key: 'glassWidth', label: 'Ширина стекла, мм', min: 300, max: 3000 },
      { key: 'height', label: 'Высота, мм', min: 1200, max: 3000 }
    ],
    '9': [
      { key: 'bathLength', label: 'Длина ванны, мм', min: 1000, max: 2200 },
      { key: 'screenHeight', label: 'Высота шторки, мм', min: 1200, max: 2000 }
    ]
  };

  private readonly defaultInstallations: SelectOption[] = [
    { id: 'default-a', label: 'Вариант 1', image: 'assets/img/examples/example1.jpg' },
    { id: 'default-b', label: 'Вариант 2', image: 'assets/img/examples/example2.jpg' },
    { id: 'default-c', label: 'Вариант 3', image: 'assets/img/examples/example3.jpg' }
  ];

  constructor(
    private cardService: CardsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cardService.getCardById(id).subscribe({
        next: (data) => {
          this.card = data || null;
          this.applyCardConfig();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/cards']);
        }
      });
    } else {
      this.router.navigate(['/cards']);
    }
  }

  getTelegramLink(): string {
    const baseUrl = 'https://t.me/+79110293030';
    return `${baseUrl}?text=${encodeURIComponent(this.buildTechnicalTaskMessage())}`;
  }

  onEstimateClick(event: Event): void {
    if (!this.isReadyForEstimate()) {
      event.preventDefault();
    }
  }

  toggleEmailEstimate(): void {
    if (!this.isReadyForEstimate()) {
      this.configForm.markAllAsTouched();
      return;
    }

    this.isEmailEstimateOpen = !this.isEmailEstimateOpen;
  }

  submitEmailEstimate(): void {
    if (!this.isReadyForEstimate()) {
      this.configForm.markAllAsTouched();
      return;
    }

    if (this.emailEstimateForm.invalid || this.isEmailEstimateSending) {
      this.emailEstimateForm.markAllAsTouched();
      return;
    }

    const { name, phone, comment } = this.emailEstimateForm.getRawValue();
    const message = this.buildEmailEstimateMessage(comment);

    this.isEmailEstimateSending = true;
    this.http.post(this.contactEndpoint, { name, phone, message }).subscribe({
      next: () => {
        this.isEmailEstimateSending = false;
        this.isEmailEstimateOpen = false;
        this.emailEstimateForm.reset({
          name: '',
          phone: '',
          comment: '',
          consent: false
        });
        this.messageService.add({
          severity: 'success',
          summary: 'ТЗ отправлено',
          detail: 'Заявка с выбранными параметрами отправлена на почту.',
          life: 4000
        });
      },
      error: () => {
        this.isEmailEstimateSending = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Не удалось отправить ТЗ',
          detail: 'Проверьте соединение и попробуйте еще раз.',
          life: 4000
        });
      }
    });
  }

  onImgError(event: Event): void {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl || imgEl.dataset['fallbackApplied'] === '1') return;
    imgEl.dataset['fallbackApplied'] = '1';
    if (this.card?.imgUrl) {
      imgEl.src = this.card.imgUrl;
    }
  }

  hideBrokenOptionImage(event: Event): void {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl) return;
    imgEl.style.visibility = 'hidden';
  }

  openLightbox(imageUrl: string): void {
    this.lightboxImage = imageUrl;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.lightboxImage = '';
  }

  openHardwareDetails(optionId: string, event: Event): void {
    event.stopPropagation();
    this.activeHardwareDetailId = optionId;
    this.activeHardwareDetail = this.hardwareDetailsById[optionId] ?? null;
  }

  closeHardwareDetails(): void {
    this.activeHardwareDetail = null;
    this.activeHardwareDetailId = '';
  }

  hasHardwareDetails(optionId: string): boolean {
    return Boolean(this.hardwareDetailsById[optionId]);
  }

  toggleHardwareVariant(variantId: string, event: Event): void {
    event.stopPropagation();

    const controlName = this.activeHardwareDetail?.variantControl;
    if (!controlName) return;

    const control = this.configForm.controls[controlName];
    control.setValue(control.value === variantId ? '' : variantId);
    control.markAsTouched();
  }

  isHardwareVariantSelected(variantId: string): boolean {
    const controlName = this.activeHardwareDetail?.variantControl;
    return controlName ? this.configForm.controls[controlName].value === variantId : false;
  }

  getMainImage(): string {
    if (this.card?.imgUrl) return this.card.imgUrl;
    if (this.card?.img) return `assets/img/cards/${this.card.img}`;
    return '';
  }

  getDimensionsGroup(): FormGroup {
    return this.configForm.controls.dimensions;
  }

  getDimensionFields(): DimensionField[] {
    return this.currentConfig?.dimensions ?? [];
  }

  getConfigOptions(type: 'glassColors' | 'glassFinishes' | 'hardwareColors' | 'hingeOptions' | 'handleOptions' | 'installationOptions'): SelectOption[] {
    return this.currentConfig?.[type] ?? [];
  }

  selectOption(control: 'glassColor' | 'glassFinish' | 'hardwareColor' | 'hingeOption' | 'handleOption' | 'installationOption', value: string): void {
    this.configForm.controls[control].setValue(value);
    this.configForm.controls[control].markAsTouched();
  }

  isSelected(control: 'glassColor' | 'glassFinish' | 'hardwareColor' | 'hingeOption' | 'handleOption' | 'installationOption', value: string): boolean {
    return this.configForm.controls[control].value === value;
  }

  isReadyForEstimate(): boolean {
    return this.configForm.valid;
  }

  private applyCardConfig(): void {
    const config = this.resolveCardConfig();
    this.currentConfig = config;

    const dimensionsGroup = this.configForm.controls.dimensions;
    Object.keys(dimensionsGroup.controls).forEach((key) => dimensionsGroup.removeControl(key));

    config.dimensions.forEach((field) => {
      const validators = [];
      if (field.required !== false) {
        validators.push(Validators.required);
      }

      if (typeof field.min === 'number') {
        validators.push(Validators.min(field.min));
      }
      if (typeof field.max === 'number') {
        validators.push(Validators.max(field.max));
      }

      dimensionsGroup.addControl(
        field.key,
        new FormControl<number | null>(null, { validators })
      );
    });

    this.configForm.patchValue({
      glassColor: '',
      glassFinish: '',
      hardwareColor: '',
      hingeOption: '',
      handleOption: '',
      knobVariant: '',
      barVariant: '',
      towelHolderVariant: '',
      installationOption: ''
    });

    const hingeControl = this.configForm.controls.hingeOption;
    if (config.hingeOptions.length) {
      hingeControl.setValidators([Validators.required]);
    } else {
      hingeControl.clearValidators();
    }
    hingeControl.updateValueAndValidity();

    dimensionsGroup.markAsPristine();
    dimensionsGroup.markAsUntouched();
  }

  private resolveCardConfig(): CardConfigurator {
    const cardId = this.card?.id ?? '';

    return {
      glassColors: [...this.defaultGlassColors],
      glassFinishes: [...this.defaultGlassFinishes],
      hardwareColors: [...this.defaultHardwareColors],
      hingeOptions: [...(this.hingeOptionsByCardId[cardId] ?? this.defaultHingeOptions)],
      handleOptions: [...(this.handleOptionsByCardId[cardId] ?? this.defaultHandleOptions)],
      installationOptions:
        this.installationOptionsByCardId[cardId] ?? this.defaultInstallations,
      dimensions: this.dimensionsByCardId[cardId] ?? [
        { key: 'width', label: 'Ширина, мм', min: 300, max: 4000 },
        { key: 'height', label: 'Высота, мм', min: 300, max: 4000 }
      ]
    };
  }

  private buildTechnicalTaskMessage(): string {
    const cardName = this.card?.name?.trim() || 'Неизвестная модель';
    const glassColor = this.getSelectedLabel('glassColors', this.configForm.controls.glassColor.value);
    const glassFinish = this.getSelectedLabel('glassFinishes', this.configForm.controls.glassFinish.value);
    const hardwareColor = this.getSelectedLabel('hardwareColors', this.configForm.controls.hardwareColor.value);
    const hinge = this.getSelectedLabel('hingeOptions', this.configForm.controls.hingeOption.value);
    const handleId = this.configForm.controls.handleOption.value;
    const handle = this.getSelectedLabel('handleOptions', handleId);
    const handleVariant = this.getSelectedHardwareVariantLabel(
      handleId,
      this.getSelectedHandleVariantValue(handleId)
    );
    const installation = this.getSelectedLabel('installationOptions', this.configForm.controls.installationOption.value);

    const dimensionsText = this.getDimensionFields()
      .map((field) => {
        const value = this.getDimensionsGroup().controls[field.key]?.value;
        return `${field.label}: ${value || '-'} мм`;
      })
      .join('\n');

    if (!this.isReadyForEstimate()) {
      return `Здравствуйте! Интересует расчет по изделию: ${cardName}`;
    }

    const messageLines = [
      'Здравствуйте! Прошу рассчитать стоимость по ТЗ:',
      '',
      `Изделие: ${cardName}`,
      `Стекло (цвет): ${glassColor}`,
      `Стекло (поверхность): ${glassFinish}`,
      `Фурнитура (цвет): ${hardwareColor}`,
      `Ручка: ${handle}`,
      `Вариант ручки: ${handleVariant}`,
      `Вариант установки: ${installation}`,
      '',
      'Размеры:',
      dimensionsText
    ];

    if (this.getConfigOptions('hingeOptions').length) {
      messageLines.splice(6, 0, `Петли: ${hinge}`);
    }

    return messageLines.join('\n');
  }

  private buildEmailEstimateMessage(comment: string): string {
    const messageParts = [this.buildTechnicalTaskMessage()];
    const trimmedComment = comment.trim();

    if (trimmedComment) {
      messageParts.push('', 'Комментарий клиента:', trimmedComment);
    }

    return messageParts.join('\n');
  }

  private getSelectedLabel(
    type: 'glassColors' | 'glassFinishes' | 'hardwareColors' | 'hingeOptions' | 'handleOptions' | 'installationOptions',
    value: string
  ): string {
    const option = this.getConfigOptions(type).find((item) => item.id === value);
    return option?.label ?? '-';
  }

  private getSelectedHardwareVariantLabel(detailId: string, value: string): string {
    const option = this.hardwareDetailsById[detailId]?.variants?.find((item) => item.id === value);
    return option?.label ?? '-';
  }

  private getSelectedHandleVariantValue(detailId: string): string {
    const controlName = this.hardwareDetailsById[detailId]?.variantControl;
    return controlName ? this.configForm.controls[controlName].value : '';
  }
}
