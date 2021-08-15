import React, { useState, useCallback } from 'react'
import HorizontalPicker, { PickerItem } from './HorizontalPicker'

import type { FC } from 'react'

const PICKER_ITEMS: Array<PickerItem> = [
  {
    label: 'VALID',
    value: 'valid',
  },
  {
    label: 'Reserved',
    value: 'reserved',
  },
  {
    label: 'Damaged',
    value: 'damaged',
  },
  {
    label: 'Sales Document',
    value: 'sales-document',
  },
]

type Props = {
  onValueChange?: (value: unknown, index: number) => void
  selectedValue?: unknown
}

const SalesInvoiceStatusPicker: FC<Props> = (props) => {
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
      title="Sales Invoice Status"
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      items={PICKER_ITEMS}
    />
  )
}

export default SalesInvoiceStatusPicker
