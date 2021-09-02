import { makeVar } from '@apollo/client'
import { DateTime } from 'luxon'

const defaultYear = DateTime.now().year
const salesAndIncomeSelectedYear = makeVar<number>(defaultYear)

export { salesAndIncomeSelectedYear }
