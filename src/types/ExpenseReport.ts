import ReportStatus from './ReportStatus'

type ExpenseReport = {
  id: string
  reportNumber: string
  createdAt: string
  status: ReportStatus
}

export default ExpenseReport
