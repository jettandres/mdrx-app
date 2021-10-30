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

const MUTATION_UPDATE_RECEIPT_IMAGE_KEY = gql`
  mutation UpdateReceiptImageKey($receiptId: uuid!, $imageKey: String!) {
    receipt: update_receipts_by_pk(
      pk_columns: { id: $receiptId }
      _set: { image_key: $imageKey }
    ) {
      id
      imageKey: image_key
    }
  }
`

export interface UpdateReceiptImageKeyResponse {
  receipt: {
    id: string
    imageKey: string
  }
}

export interface UpdateReceiptImageKeyPayload {
  receiptId: string
  imageKey: string
}

export { DELETE_RECEIPT, MUTATION_UPDATE_RECEIPT_IMAGE_KEY }
