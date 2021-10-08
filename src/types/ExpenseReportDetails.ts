import ExpenseReportDetailedReceipt from './ExpenseReportDetailedReceipt'

type ExpenseReportDetails = {
  id: string
  createdAt: string
  summary: {
    data: Array<ExpenseReportDetailedReceipt>
  }[]
}

export default ExpenseReportDetails
