import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Keywords } from '../../models/db';
import { ImageBankService } from '../../services/image-bank.service';
import { FormatterService } from '../../services/formatter.service';

@Component({
  selector: 'app-card-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-image.component.html',
  styleUrl: './card-image.component.scss'
})
export class CardImageComponent {
  @Input() src!: string;
  @Input() fileTitle!: string;
  @Input() keywords!: Keywords[];
  @Input() id!: number;
  @Input() description!: string;
  @Input() price!: number;
  @Input() createdAt!: string;

  constructor(
    private imageService: ImageBankService,
    public formatter: FormatterService
  ) {}

  formatPrice(priceValue: number) {
    return this.formatter.currencyFormatter({ value: priceValue });
  }

  removeImage(imageId: number) {
    this.imageService.removeImage(imageId);
  }
}