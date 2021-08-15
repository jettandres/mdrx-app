import React, { useState, useCallback } from 'react'
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
    value: 'paid-in-cash',
  },
]

type Props = {
  onValueChange?: (value: unknown, index: number) => void
  selectedValue?: unknown
}

const SalesDocumentPicker: FC<Props> = (props) => {
  // TODO: pass register from react-hook-form
  const [selectedValue, setSelectedValue] = useState<PickerItem>(
    PICKER_ITEMS[0],
  )

  const onValueChange = useCallback(
    (value: unknown, index: number) => setSelectedValue(value as PickerItem),
    [],
  )

  return (
    <HorizontalPicker
      title="Sales Document"
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      items={PICKER_ITEMS}
    />
  )
}

export default SalesDocumentPicker
