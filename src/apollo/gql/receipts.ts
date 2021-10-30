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

const MUTATION_UPDATE_RECEIPT_IMAGE_URL = gql`
  mutation UpdateReceiptImageUrl($receiptId: uuid!, $imageUrl: String!) {
    receipt: update_receipts_by_pk(
      pk_columns: { id: $receiptId }
      _set: { image_url: $imageUrl }
    ) {
      id
      imageUrl: image_url
    }
  }
`

export interface UpdateReceiptImageUrlRespone {
  receipt: {
    id: string
    imageUrl: string
  }
}

export interface UpdateReceiptImageUrlPayload {
  receiptId: string
  imageUrl: string
}

export { DELETE_RECEIPT, MUTATION_UPDATE_RECEIPT_IMAGE_URL }
