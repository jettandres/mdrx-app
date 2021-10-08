import { DineroOptions } from 'dinero.js'

type Receipt = {
  id: string
  amount: DineroOptions<number>
  imageUrl: string
  supplier: {
    tin: string
    bldg: string
    name: string
    address: string
    streetBrgy: string
  }
}

export default Receipt
