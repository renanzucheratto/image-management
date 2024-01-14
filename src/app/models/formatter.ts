enum LocalesEnum {
  USD = 'en-US',
  EUR = 'de-DE',
  BRL = 'pt-BR',
}

type CurrencyFormatterSymblo = 'symbol' | 'narrowSymbol' | 'code' | 'name';
type CurrencyFormatterStyle = 'decimal' | 'currency' | 'percent';

interface CurrencyFormatterParams {
  value: number;
  currency?: keyof typeof LocalesEnum;
  symbol?: CurrencyFormatterSymblo,
  style?: CurrencyFormatterStyle,
}

export { LocalesEnum }
export type {
  CurrencyFormatterParams,
  CurrencyFormatterSymblo,
  CurrencyFormatterStyle
}