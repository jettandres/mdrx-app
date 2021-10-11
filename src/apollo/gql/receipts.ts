import { gql } from '@apollo/client'

const DELETE_RECEIPT = gql`
  mutation DeleteReceipt($receiptId: uuid!) {
    deleteReceipt: delete_receipts_by_pk(id: $receiptId) {
      id
    }
  }
`

export interface DeleteReceiptResponse {
  deleteReceipt: {
    id: string
  }
}

export interface DeleteReceiptPayload {
  receiptId: string
}

export { DELETE_RECEIPT }
