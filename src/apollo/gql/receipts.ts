import { gql } from '@apollo/client'
import Supplier from '@app/types/Supplier'

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

const QUERY_RECEIPT_SUPPLIERS = gql`
  query SearchReceiptSuppliers($tin: String!, $limit: Int) {
    results: search_receipt_suppliers(args: { tin: $tin }, limit: $limit) {
      supplier
      vatable
    }
  }
`

export interface QueryReceiptSuppliersResponse {
  results: {
    supplier: Supplier
    vatable: boolean
  }[]
}

export interface QueryReceiptSuppliersPayload {
  tin: string
  limit?: number
}

export {
  DELETE_RECEIPT,
  MUTATION_UPDATE_RECEIPT_IMAGE_KEY,
  QUERY_RECEIPT_SUPPLIERS,
}
