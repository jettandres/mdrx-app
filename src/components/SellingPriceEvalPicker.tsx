import React, { useState, useCallback } from 'react'
import HorizontalPicker, { PickerItem } from './HorizontalPicker'

import type { FC } from 'react'

const PICKER_ITEMS: Array<PickerItem> = [
  {
    label: 'Acceptable',
    value: 'acceptable',
  },
  {
    label: 'Low Profitability',
    value: 'low-profitability',
  },
  {
    label: 'Unacceptable',
    value: 'unacceptable',
  },
]

type Props = {
  onValueChange?: (value: unknown, index: number) => void
  selectedValue?: unknown
}

const SellingPriceEvalPicker: FC<Props> = (props) => {
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
      title="Selling Price Evaluation"
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      items={PICKER_ITEMS}
    />
  )
}

export default SellingPriceEvalPicker
