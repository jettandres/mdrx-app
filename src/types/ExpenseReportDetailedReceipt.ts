import { DineroOptions } from 'dinero.js'
import Receipt from './Receipt'

type ExpenseReportDetailedReceipt = {
  id: string
  name: string
  total: {
    ytd: DineroOptions<number>
    month: DineroOptions<number>
  }
  receipts: Array<Receipt>
}

export default ExpenseReportDetailedReceipt
