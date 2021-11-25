import { gql } from '@apollo/client'
import Employee from '@app/types/Employee'

const GET_EMPLOYEES = gql`
  query getEmployees($id: uuid!) {
    employees(where: { id: { _eq: $id } }) {
      id
      name
      custodianAssignment: custodian_assignment
      email
      contactNumber: contact_number
      area
      code
    }
  }
`

export interface GetEmployeesPayload {
  id: string
}

export interface GetEmployeeResponse {
  employees: Array<Employee>
}

export { GET_EMPLOYEES }
