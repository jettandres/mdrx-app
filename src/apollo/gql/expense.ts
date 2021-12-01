import { gql } from '@apollo/client'
import Expense from '@app/types/Expense'
import ExpenseReport from '@app/types/ExpenseReport'
import ReportStatus from '@app/types/ReportStatus'
import { DineroSnapshot } from 'dinero.js'

const QUERY_EXPENSE = gql`
  query expense {
    expense {
      id
      name
      birClass: bir_class
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
    supplier: {
      tin: string
      name: string
      address: string
      streetBrgy: string
      bldg: string
    }
    vatable: boolean
    net: DineroSnapshot<number>
    vat: DineroSnapshot<number>
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

const MUTATION_DELETE_EXPENSE_REPORT = gql`
  mutation DeleteExpenseReport($expenseReportId: uuid!) {
    expenseReport: delete_expense_report_by_pk(id: $expenseReportId) {
      id
    }
  }
`

export interface DeleteExpenseReportPayload {
  expenseReportId: string
}

export interface DeleteExpenseReportResponse {
  expenseReport: { id: string }
}

const MUTATION_SUBMIT_EXPENSE_REPORT = gql`
  mutation SubmitExpenseReport(
    $expenseReportId: uuid!
    $revAmount: jsonb!
    $replAmount: jsonb!
    $unusedAmount: jsonb!
  ) {
    expenseReport: update_expense_report_by_pk(
      _set: { status: SUBMITTED }
      pk_columns: { id: $expenseReportId }
    ) {
      id
      status
    }

    expenseReportFunds: insert_expense_report_funds_one(
      object: {
        expense_report_id: $expenseReportId
        revolving_fund_amount: $revAmount
        replenishable_amount: $replAmount
        unused_amount: $unusedAmount
      }
    ) {
      expenseReportId: expense_report_id
      revolvingFundAmount: revolving_fund_amount
      replenishableAmount: replenishable_amount
      unusedAmount: unused_amount
    }
  }
`

export interface SubmitExpenseReportResponse {
  expenseReport: {
    id: string
    status: ReportStatus
  }
  expenseReportFunds: {
    expenseReportId: string
    revolvingFundAmount: DineroSnapshot<number>
    replenishableAmount: DineroSnapshot<number>
    unusedAmount: DineroSnapshot<number>
  }
}

export interface SubmitExpenseReportPayload {
  expenseReportId: string
  revAmount: DineroSnapshot<number>
  replAmount: DineroSnapshot<number>
  unusedAmount: DineroSnapshot<number>
}

export {
  QUERY_EXPENSE,
  MUTATION_NEW_EXPENSE_REPORT,
  QUERY_EXPENSE_REPORTS,
  MUTATION_NEW_EXPENSE_RECEIPT,
  MUTATION_NEW_KM_READING,
  MUTATION_DELETE_EXPENSE_REPORT,
  MUTATION_SUBMIT_EXPENSE_REPORT,
}
