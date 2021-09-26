import { makeVar } from '@apollo/client'
import { DateTime } from 'luxon'

import Employee from '@app/types/Employee'
import ExpenseReportDraft from '@app/types/ExpenseReportDraft'

const defaultYear = DateTime.now().year
const salesAndIncomeSelectedYear = makeVar<number>(defaultYear)

const employeeInfo = makeVar<Employee | undefined>(undefined)
const viewedExpenseReport = makeVar<ExpenseReportDraft | undefined>(undefined)

export { salesAndIncomeSelectedYear, employeeInfo, viewedExpenseReport }
