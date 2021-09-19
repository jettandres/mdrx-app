import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import HorizontalLabel from '@components/HorizontalLabel'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { Control } from 'react-hook-form'

import { useController } from 'react-hook-form'

type Props = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
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
  const { control, name } = props
  const { field } = useController({
    control,
    name,
    defaultValue: expenses[0].value,
  })

  const [expenseClass, setExpenseClass] = useState<string | undefined>()

  useEffect(() => {
    const expClass = expenses.find((v) => v.value === field.value)
    if (expClass) {
      setExpenseClass(expClass.expenseClass)
    }
  }, [field.value])

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>Expense</Text>
        <View style={styles.pickerContainer}>
          <Picker
            onValueChange={(v: ExpenseType) => field.onChange(v.value)}
            selectedValue={expenses.find((e) => e.value === field.value)}>
            {expenses.map((e) => (
              <Picker.Item key={e.value} label={e.label} value={e} />
            ))}
          </Picker>
        </View>
      </View>
      <HorizontalLabel title="Class" subtitle={expenseClass ?? ''} />
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
