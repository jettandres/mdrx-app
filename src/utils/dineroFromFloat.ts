import { dinero } from 'dinero.js'

const dineroFromFloat = ({ amount: float, currency, scale }) => {
  const factor = currency.base ** currency.exponent || scale
  const amount = Math.round(float * factor)

  return dinero({ amount, currency, scale })
}

export default dineroFromFloat
