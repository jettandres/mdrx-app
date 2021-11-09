import { DineroOptions } from 'dinero.js'

type Receipt = {
  id: string
  amount: DineroOptions<number>
  imageKey: string
  supplier: {
    tin: string
    bldg: string
    name: string
    address: string
    streetBrgy: string
  }
  vatable: boolean
}

export default Receipt
