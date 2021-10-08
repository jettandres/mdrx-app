import { Dinero } from 'dinero.js'

type Receipt = {
  id: string
  amount: Dinero<number>
  imageUrl: string
  supplier: {
    tin: string
    bldg: string
    name: string
    address: string
    streetBrgy: string
  }
}

type ExpenseReportDetailedReceipt = {
  id: string
  name: string
  total: {
    ytd: Dinero<number>
    month: Dinero<number>
  }
  receipts: Array<Receipt>
}

export default ExpenseReportDetailedReceipt
