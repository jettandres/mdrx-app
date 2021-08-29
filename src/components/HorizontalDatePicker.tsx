import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DateTime } from 'luxon'
import DateTimePicker from '@react-native-community/datetimepicker'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  title: string
}

const HorizontalDatePicker: FC<Props> = (props) => {
  const { title } = props
  const defaultDate = DateTime.now().toJSDate()

  const [pickerVisible, setPickerVisible] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate)

  const onSelectDate = useCallback((event, date) => {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.type === 'set' && DateTime.fromJSDate(date).isValid) {
      setPickerVisible(false)
      setSelectedDate(date)
      console.log(date)
    }
  }, [])

  const onPressTextInput = useCallback(() => {
    setPickerVisible((v) => !v)
  }, [])

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <TouchableOpacity style={styles.textInput} onPress={onPressTextInput}>
        <Text style={styles.textInputLabel}>
          {DateTime.fromJSDate(selectedDate).toLocaleString(DateTime.DATE_FULL)}
        </Text>
      </TouchableOpacity>
      {pickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={false}
          onChange={onSelectDate}
          display="default"
          minimumDate={defaultDate}
        />
      )}
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '45%',
    borderColor: '$borderColor',
    borderBottomWidth: 1,
  },
  textInputLabel: {
    paddingBottom: '$spacingXs',
    paddingHorizontal: '$spacingSm',
  },
})

export default HorizontalDatePicker
