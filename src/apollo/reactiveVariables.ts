import { makeVar } from '@apollo/client'
import { DateTime } from 'luxon'

import Employee from '@app/types/Employee'

const defaultYear = DateTime.now().year
const salesAndIncomeSelectedYear = makeVar<number>(defaultYear)

const employeeInfo = makeVar<Employee | undefined>(undefined)

export { salesAndIncomeSelectedYear, employeeInfo }
