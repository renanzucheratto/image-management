import { Injectable } from '@angular/core';
import { CurrencyFormatterParams, LocalesEnum } from '../models/formatter';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  private currency: CurrencyFormatterParams['currency'] = 'BRL';

  constructor() {}

  currencyFormatter({ 
    value,
    currency = this.currency,
    style = 'currency',
    symbol = 'narrowSymbol'
  }: CurrencyFormatterParams): string {
    const locale: LocalesEnum = LocalesEnum[currency!];
    const amount = new Intl.NumberFormat(locale, {
      currency,
      style,
      currencyDisplay: symbol,
    }).format(value)
  
    return `${amount}`;
  }
}
