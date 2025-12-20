import { formatCurrency } from '@angular/common';
import { CurrencyEnum } from '../models/currency.enum';

const currencyCodeToSymbol = (currencyCode: string): CurrencyEnum => {
  switch (currencyCode) {
    case 'EUR':
      return CurrencyEnum.EURO;
    case 'USD':
      return CurrencyEnum.DOLLAR;
    default:
      return CurrencyEnum.EURO;
  }
};

export const numberToCurrency = (value: number, locale = 'de', currencyCode = 'EUR'): string => {
  return formatCurrency(value, locale, currencyCodeToSymbol(currencyCode));
};
