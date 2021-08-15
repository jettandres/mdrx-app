import React, { useState, useCallback } from 'react'
import HorizontalPicker, { PickerItem } from './HorizontalPicker'

import type { FC } from 'react'

const PICKER_ITEMS: Array<PickerItem> = [
  {
    label: 'Local Supplies',
    value: 'local-supplies',
  },
  {
    label: 'Local Equipment',
    value: 'local-equipment',
  },
  {
    label: 'Imported Supplies',
    value: 'imported-supplies',
  },
  {
    label: 'IOL',
    value: 'iol',
  },
  {
    label: 'Imported Instrument',
    value: 'imported-instrument',
  },
  {
    label: 'Local Instrument',
    value: 'local-instrument',
  },
]

type Props = {
  onValueChange?: (value: unknown, index: number) => void
  selectedValue?: unknown
}

const ProductClassPicker: FC<Props> = (props) => {
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
      title="Product Class"
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      items={PICKER_ITEMS}
    />
  )
}

export default ProductClassPicker
