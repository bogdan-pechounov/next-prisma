const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(price: number) {
  return formatter.format(price)
}
