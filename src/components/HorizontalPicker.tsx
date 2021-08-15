import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

export type PickerItem = {
  label: string
  value: unknown
}

type Props = {
  title: string
  onValueChange?: (value: unknown, index: number) => void
  selectedValue?: unknown
  items: Array<PickerItem>
}

const HorizontalPicker: FC<Props> = (props) => {
  const { onValueChange, selectedValue, items, title } = props
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.pickerContainer}>
        <Picker onValueChange={onValueChange} selectedValue={selectedValue}>
          {items.map((i) => (
            <Picker.Item key={i.label} label={i.label} value={i.value} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    width: '45%',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
  },
})

export default HorizontalPicker
