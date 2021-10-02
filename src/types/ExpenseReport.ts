type ExpenseReport = {
  id: string
  reportNumber: string
  createdAt: string
  status: 'DRAFT' | 'SUBMITTED'
}

export default ExpenseReport
