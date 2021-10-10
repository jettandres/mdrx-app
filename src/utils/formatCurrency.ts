import { toUnit } from 'dinero.js'
import type { Dinero } from 'dinero.js'

const formatCurrency = (value: Dinero<number>): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  })

  return formatter.format(toUnit(value)).replace('PHP', '₱')
}

export default formatCurrency
