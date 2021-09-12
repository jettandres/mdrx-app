import { gql } from '@apollo/client'
import Employee from '@app/types/Employee'

const GET_EMPLOYEES = gql`
  query getEmployees($code: String!) {
    employees(where: { code: { _eq: $code } }) {
      name
      custodianAssignment: custodian_assignment
      email
      contactNumber: contact_number
      area
    }
  }
`

export interface GetEmployeesPayload {
  code: string
}

export interface GetEmployeeResponse {
  employees: Array<Employee>
}

export { GET_EMPLOYEES }
