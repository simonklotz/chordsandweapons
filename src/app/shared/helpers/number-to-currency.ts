import { CurrencyEnum } from '../models/currency.enum';
import { formatCurrency } from '@angular/common';

export const numberToCurrency = (
  value: number,
  locale = 'de',
  currency = CurrencyEnum.EURO,
): string => {
  return formatCurrency(value, locale, currency);
};
