import { DineroSnapshot } from 'dinero.js'

type Employee = {
  id: string
  name: string
  custodianAssignment: string
  email: string
  contactNumber: string
  area: string
  funds?: DineroSnapshot<number>
}

export default Employee
