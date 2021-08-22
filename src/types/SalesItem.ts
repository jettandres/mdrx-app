import type SellingPriceEvaluation from './SellingPriceEvaluation'

type SalesItem = {
  code: string
  description: string
  pcsSold: number
  price: string
  income: string
  percentage: string
  remarks: SellingPriceEvaluation
  ytd: {
    pcsSold: number
    gross: string
    income: string
  }
}

export default SalesItem
