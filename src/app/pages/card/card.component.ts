import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ICards } from '../../models/cards';
import { CardsService } from '../../services/cards.service';

type SelectOption = {
  id: string;
  label: string;
  hex?: string;
  image?: string;
};

type DimensionField = {
  key: string;
  label: string;
  min?: number;
  max?: number;
};

type CardConfigurator = {
  glassColors: SelectOption[];
  glassFinishes: SelectOption[];
  hardwareColors: SelectOption[];
  installationOptions: SelectOption[];
  dimensions: DimensionField[];
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, ProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  card: ICards | null = null;
  loading = true;
  isLightboxOpen = false;
  lightboxImage = '';

  currentConfig: CardConfigurator | null = null;

  readonly configForm = new FormGroup({
    glassColor: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    glassFinish: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    hardwareColor: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    installationOption: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dimensions: new FormGroup({})
  });

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
    { id: 'black', label: 'Черный матовый', hex: '#2B2B2B' },
    { id: 'white', label: 'Белый матовый', hex: '#F4F4F4' },
    { id: 'gold', label: 'Золото', hex: '#C9A14A' },
    { id: 'satin', label: 'Сатин', hex: '#B6B6B6' },
    { id: 'bronze', label: 'Бронза', hex: '#8F6A48' },
    { id: 'nickel', label: 'Никель', hex: '#9EA5AF' },
    { id: 'graphite', label: 'Графит', hex: '#555A63' }
  ];

  private readonly installationOptionsByCardId: Record<string, SelectOption[]> = {
    '1': [
      { id: '1-a', label: 'Вариант 1', image: 'assets/img/examples/example1.jpg' },
      { id: '1-b', label: 'Вариант 2', image: 'assets/img/examples/example2.jpg' },
      { id: '1-c', label: 'Вариант 3', image: 'assets/img/examples/example3.jpg' }
    ],
    '2': [
      { id: '2-a', label: 'Вариант 1', image: 'assets/img/examples/example4.jpg' },
      { id: '2-b', label: 'Вариант 2', image: 'assets/img/examples/example5.jpg' },
      { id: '2-c', label: 'Вариант 3', image: 'assets/img/examples/example6.jpg' }
    ],
    '3': [
      { id: '3-a', label: 'Вариант 1', image: 'assets/img/examples/example7.jpg' },
      { id: '3-b', label: 'Вариант 2', image: 'assets/img/examples/example8.jpg' },
      { id: '3-c', label: 'Вариант 3', image: 'assets/img/examples/example9.jpg' }
    ],
    '4': [
      { id: '4-a', label: 'Вариант 1', image: 'assets/img/examples/example2.jpg' },
      { id: '4-b', label: 'Вариант 2', image: 'assets/img/examples/example5.jpg' },
      { id: '4-c', label: 'Вариант 3', image: 'assets/img/examples/example8.jpg' }
    ],
    '5': [
      { id: '5-a', label: 'Вариант 1', image: 'assets/img/examples/example1.jpg' },
      { id: '5-b', label: 'Вариант 2', image: 'assets/img/examples/example4.jpg' },
      { id: '5-c', label: 'Вариант 3', image: 'assets/img/examples/example7.jpg' }
    ],
    '6': [
      { id: '6-a', label: 'Вариант 1', image: 'assets/img/examples/example3.jpg' },
      { id: '6-b', label: 'Вариант 2', image: 'assets/img/examples/example6.jpg' },
      { id: '6-c', label: 'Вариант 3', image: 'assets/img/examples/example9.jpg' }
    ],
    '7': [
      { id: '7-a', label: 'Вариант 1', image: 'assets/img/examples/example2.jpg' },
      { id: '7-b', label: 'Вариант 2', image: 'assets/img/examples/example4.jpg' },
      { id: '7-c', label: 'Вариант 3', image: 'assets/img/examples/example6.jpg' }
    ],
    '8': [
      { id: '8-a', label: 'Вариант 1', image: 'assets/img/examples/example3.jpg' },
      { id: '8-b', label: 'Вариант 2', image: 'assets/img/examples/example5.jpg' },
      { id: '8-c', label: 'Вариант 3', image: 'assets/img/examples/example7.jpg' }
    ],
    '9': [
      { id: '9-a', label: 'Вариант 1', image: 'assets/img/examples/example1.jpg' },
      { id: '9-b', label: 'Вариант 2', image: 'assets/img/examples/example8.jpg' },
      { id: '9-c', label: 'Вариант 3', image: 'assets/img/examples/example9.jpg' }
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
      { key: 'height', label: 'Высота, мм', min: 1600, max: 2800 }
    ],
    '6': [
      { key: 'systemWidth', label: 'Ширина системы, мм', min: 900, max: 2800 },
      { key: 'height', label: 'Высота, мм', min: 1600, max: 3000 }
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
    private router: Router
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

  onImgError(event: Event): void {
    const imgEl = event.target as HTMLImageElement | null;
    if (!imgEl || imgEl.dataset['fallbackApplied'] === '1') return;
    imgEl.dataset['fallbackApplied'] = '1';
    if (this.card?.imgUrl) {
      imgEl.src = this.card.imgUrl;
    }
  }

  openLightbox(imageUrl: string): void {
    this.lightboxImage = imageUrl;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.lightboxImage = '';
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

  getConfigOptions(type: 'glassColors' | 'glassFinishes' | 'hardwareColors' | 'installationOptions'): SelectOption[] {
    return this.currentConfig?.[type] ?? [];
  }

  selectOption(control: 'glassColor' | 'glassFinish' | 'hardwareColor' | 'installationOption', value: string): void {
    this.configForm.controls[control].setValue(value);
    this.configForm.controls[control].markAsTouched();
  }

  isSelected(control: 'glassColor' | 'glassFinish' | 'hardwareColor' | 'installationOption', value: string): boolean {
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
      const validators = [Validators.required, Validators.min(field.min ?? 1)];
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
      installationOption: ''
    });

    dimensionsGroup.markAsPristine();
    dimensionsGroup.markAsUntouched();
  }

  private resolveCardConfig(): CardConfigurator {
    const cardId = this.card?.id ?? '';
    const installationFromCard = (this.card?.installationGalleryImages ?? [])
      .filter((item) => typeof item === 'string' && item.trim().length > 0)
      .map((image, index) => ({
        id: `${cardId || 'card'}-img-${index + 1}`,
        label: `Вариант ${index + 1}`,
        image
      }));

    return {
      glassColors: [...this.defaultGlassColors],
      glassFinishes: [...this.defaultGlassFinishes],
      hardwareColors: [...this.defaultHardwareColors],
      installationOptions:
        installationFromCard.length > 0
          ? installationFromCard
          : this.installationOptionsByCardId[cardId] ?? this.defaultInstallations,
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

    return [
      'Здравствуйте! Прошу рассчитать стоимость по ТЗ:',
      '',
      `Изделие: ${cardName}`,
      `Стекло (цвет): ${glassColor}`,
      `Стекло (поверхность): ${glassFinish}`,
      `Фурнитура (цвет): ${hardwareColor}`,
      `Вариант установки: ${installation}`,
      '',
      'Размеры:',
      dimensionsText
    ].join('\n');
  }

  private getSelectedLabel(
    type: 'glassColors' | 'glassFinishes' | 'hardwareColors' | 'installationOptions',
    value: string
  ): string {
    const option = this.getConfigOptions(type).find((item) => item.id === value);
    return option?.label ?? '-';
  }
}
