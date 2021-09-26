import { gql } from '@apollo/client'
import Expense from '@app/types/Expense'

const GET_EXPENSE = gql`
  query expense {
    expense {
      id
      name
      birClass: bir_class
      vatable
    }
  }
`

export interface GetExpenseResponse {
  expense: Array<Expense>
}

const MUTATION_NEW_EXPENSE_REPORT = gql`
  mutation new_expense_report($expenseReport: expense_report_insert_input!) {
    data: insert_expense_report_one(object: $expenseReport) {
      id
      reportNumber: report_number
    }
  }
`

export interface NewExpenseReportPayload {
  expenseReport: {
    employee_id: string
    status: 'DRAFT' | 'SUBMITTED'
    report_number: string
  }
}

export interface NewExpenseReportResponse {
  data: {
    id: string
    reportNumber: string
  }
}

export { GET_EXPENSE, MUTATION_NEW_EXPENSE_REPORT }
