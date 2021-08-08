import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import HorizontalLabel from '@components/HorizontalLabel'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  onValueChange?: (value: string, index: number) => void
  selectedValue?: string
}

type ExpenseType = {
  label: string
  value: string
  expenseClass: string
}

const expenses: Array<ExpenseType> = [
  {
    label: 'Gas',
    value: 'gas',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Office Supplies',
    value: 'office supplies',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Insurance',
    value: 'insurance',
    expenseClass: 'VATable services',
  },
  {
    label: 'Local Capital Goods',
    value: 'local capital goods',
    expenseClass: 'Capital Goods',
  },
]

const ExpensePicker: FC<Props> = (props) => {
  const [selectedValue, setSelectedValue] = useState<ExpenseType>(expenses[0])

  const onValueChange = useCallback((value: ExpenseType, index: number) => {
    setSelectedValue(value)
  }, [])

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>Expense</Text>
        <View style={styles.pickerContainer}>
          <Picker onValueChange={onValueChange} selectedValue={selectedValue}>
            {expenses.map((e) => (
              <Picker.Item key={e.value} label={e.label} value={e} />
            ))}
          </Picker>
        </View>
      </View>
      <HorizontalLabel title="Class" subtitle={selectedValue.expenseClass} />
    </View>
  )
}

const styles = EStyleSheet.create({
  root: {
    paddingVertical: '$spacingSm',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '$spacingSm',
  },
  pickerContainer: {
    width: '45%',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
  },
})

export default ExpensePicker
