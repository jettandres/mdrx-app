import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { Control } from 'react-hook-form'

import { useController } from 'react-hook-form'

export type PickerItem = {
  label: string
  value: unknown
}

type Props = {
  title: string
  items: Array<PickerItem>
  borderless?: boolean
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}

const HorizontalPicker: FC<Props> = (props) => {
  const { items, title, borderless = false, control, name } = props
  const [value, setValue] = useState<PickerItem | undefined>()

  const { field } = useController({
    control,
    defaultValue: items[0].value,
    name,
  })

  const onPickerValueChange = useCallback(
    (v: PickerItem) => {
      field.onChange(v)
      setValue(v)
    },
    [field],
  )

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View
        style={
          borderless ? styles.pickerContainerBorderless : styles.pickerContainer
        }>
        <Picker
          onValueChange={onPickerValueChange}
          selectedValue={value ?? field.value}>
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
  pickerContainerBorderless: {
    width: '33%',
  },
})

export default HorizontalPicker
