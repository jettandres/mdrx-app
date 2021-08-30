import React, { useCallback } from 'react'
import { View } from 'react-native'
import HorizontalPicker, { PickerItem } from './HorizontalPicker'

import { DateTime } from 'luxon'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  selectedValue: number
  onPickerValueChange: (value: number) => void
}

const generateYearPickerItems = (): Array<PickerItem> => {
  const yearItems: Array<PickerItem> = []
  const yearNow = DateTime.now().year
  const yearAgo = DateTime.now().minus({ years: 4 }).year

  for (let x = yearAgo; x <= yearNow; x++) {
    yearItems.push({
      label: x.toString(),
      value: x,
    })
  }

  return yearItems
}

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
        items={generateYearPickerItems()}
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
