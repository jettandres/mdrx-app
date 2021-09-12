import React from 'react'
import HorizontalPicker, { PickerItem } from './HorizontalPicker'

import type { FC } from 'react'

const PICKER_ITEMS: Array<PickerItem> = [
  {
    label: 'Sales Invoice',
    value: 'sales-invoice',
  },
  {
    label: 'Delivery Receipt',
    value: 'delivery-receipt',
  },
  {
    label: 'Paid in Cash',
    value: 'cash',
  },
]

type Props = {
  onValueChange: (value: unknown, index: number) => void
  value: unknown
}

const SalesDocumentPicker: FC<Props> = (props) => {
  const { onValueChange, value } = props

  return (
    <HorizontalPicker
      title="Sales Document"
      onValueChange={onValueChange}
      selectedValue={value}
      items={PICKER_ITEMS}
    />
  )
}

export default SalesDocumentPicker
