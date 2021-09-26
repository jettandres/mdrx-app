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

export { GET_EXPENSE }
