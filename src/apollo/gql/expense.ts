import { gql } from '@apollo/client'
import Expense from '@app/types/Expense'
import ExpenseReport from '@app/types/ExpenseReport'

const QUERY_EXPENSE = gql`
  query expense {
    expense {
      id
      name
      birClass: bir_class
      vatable
    }
  }
`

export interface QueryExpenseResponse {
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

const QUERY_EXPENSE_REPORTS = gql`
  query ExpenseReports($employeeId: uuid) {
    expenseReports: expense_report(
      where: { employee_id: { _eq: $employeeId } }
    ) {
      id
      reportNumber: report_number
      createdAt: created_at
      status
    }
  }
`

export interface QueryExpenseReportsResponse {
  expenseReports: Array<ExpenseReport>
}

export interface QueryExpenseReportsPayload {
  employeeId: string
}

export { QUERY_EXPENSE, MUTATION_NEW_EXPENSE_REPORT, QUERY_EXPENSE_REPORTS }
