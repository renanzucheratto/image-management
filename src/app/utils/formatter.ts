const currencyFormatter = (
  value: any,
  symbol: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'narrowSymbol',
  style: 'decimal' | 'currency' | 'percent' = 'currency'
) => {
  const amount = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style,
    currencyDisplay: symbol,
  }).format(value)

  return `${amount}`;
};

export { currencyFormatter }