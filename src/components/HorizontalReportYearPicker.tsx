import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import HorizontalPicker, { PickerItem } from './HorizontalPicker'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  selectedValue: number
  onPickerValueChange: (value: number) => void
}

const YearPickerItems: Array<PickerItem> = [
  {
    label: '2020',
    value: 2020,
  },
  {
    label: '2021',
    value: 2021,
  },
]

const HorizontalReportYearPicker: FC<Props> = (props) => {
  const { onPickerValueChange, selectedValue } = props

  const onValueChange = useCallback(
    (value: unknown) => {
      onPickerValueChange(value as number)
    },
    [onPickerValueChange],
  )

  return (
    <View style={styles.container}>
      <HorizontalPicker
        borderless
        onValueChange={onValueChange}
        selectedValue={selectedValue}
        title="Report Year"
        items={YearPickerItems}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    paddingHorizontal: '$spacingSm',
  },
})

export default HorizontalReportYearPicker
