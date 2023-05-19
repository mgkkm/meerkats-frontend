export function currencyFormat(price: string) {
  return Number(price).toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
}
