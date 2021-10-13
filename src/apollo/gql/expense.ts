import { gql } from '@apollo/client'
import Expense from '@app/types/Expense'
import ExpenseReport from '@app/types/ExpenseReport'
import { DineroSnapshot } from 'dinero.js'

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

const MUTATION_NEW_EXPENSE_RECEIPT = gql`
  mutation NewExpenseReceipt($receipt: receipts_insert_input!) {
    data: insert_receipts_one(object: $receipt) {
      id
      createdAt: created_at
      expenseReportId: expense_report_id
    }
  }
`

export interface NewExpenseReceiptResponse {
  data: {
    id: string
    createdAt: string
    expenseReportId: string
  }
}

export interface NewExpenseReceiptPayload {
  receipt: {
    amount: DineroSnapshot<number>
    expense_id: string
    expense_report_id: string
    image_url: string
    supplier: {
      tin: string
      name: string
      address: string
      streetBrgy: string
      bldg: string
    }
  }
}

const MUTATION_NEW_KM_READING = gql`
  mutation NewKmReading($kmReading: expense_report_km_reading_insert_input!) {
    kmReading: insert_expense_report_km_reading_one(object: $kmReading) {
      createdAt: created_at
      litersAdded: liters_added
      kmReading: km_reading
    }
  }
`

export interface NewKmReadingResponse {
  kmReading: {
    createdAt: string
    litersAdded: string
    kmReading: string
  }
}

export interface NewKmReadingPayload {
  kmReading: {
    expense_report_id: string
    receipt_id: string
    liters_added: number
    km_reading: number
  }
}

export {
  QUERY_EXPENSE,
  MUTATION_NEW_EXPENSE_REPORT,
  QUERY_EXPENSE_REPORTS,
  MUTATION_NEW_EXPENSE_RECEIPT,
  MUTATION_NEW_KM_READING,
}
