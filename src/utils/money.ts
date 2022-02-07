import currency from 'currency.js';

type Money = string | number;

const getValue = (value: Money) => currency(value).value;

export const equals = (a: Money, b: Money) => getValue(a) === getValue(b);

export const add = (a: Money, b: Money) => currency(a).add(b).format();

export const subtract = (a: Money, b: Money) =>
  currency(a).subtract(b).format();

export const sum = (moneys: Money[]) => moneys.reduce(add, '$0.00');

export const divide = (value: Money, rate: number) =>
  currency(value).divide(rate).format();

export const multiply = (value: Money, rate: number) =>
  currency(value).multiply(rate).format();

export const abs = (value: Money) =>
  currency(Math.abs(getValue(value))).format();

export const min = (a: Money, b: Money) =>
  currency(Math.min(getValue(a), getValue(b))).format();

export const max = (a: Money, b: Money) =>
  currency(Math.max(getValue(a), getValue(b))).format();
