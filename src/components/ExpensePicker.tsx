import React, { useCallback, useState } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import HorizontalLabel from '@components/HorizontalLabel'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { Control, FieldError } from 'react-hook-form'

import { useController } from 'react-hook-form'

import { useQuery } from '@apollo/client'
import { QUERY_EXPENSE, QueryExpenseResponse } from '@app/apollo/gql/expense'
import Expense from '@app/types/Expense'

type Props = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  error?: FieldError
}

const ExpensePicker: FC<Props> = (props) => {
  const { control, name, error } = props
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>()
  const { data } = useQuery<QueryExpenseResponse>(QUERY_EXPENSE)
  const { field } = useController({
    control,
    name,
  })

  const onPickerValueChange = useCallback(
    (v: Expense) => {
      field.onChange(v)
      setSelectedExpense(v)
    },
    [field],
  )

  const pickerStyle = error
    ? styles.pickerContainerError
    : styles.pickerContainer

  if (!data) {
    return null
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>Expense</Text>
        <View style={pickerStyle}>
          <Picker
            onValueChange={onPickerValueChange}
            selectedValue={selectedExpense ?? field.value}>
            <Picker.Item label="Select Expense" value="" />
            {data.expense.map((e) => (
              <Picker.Item key={e.id} label={e.name} value={e} />
            ))}
          </Picker>
        </View>
      </View>
      <HorizontalLabel
        title="Class"
        subtitle={(field.value as Expense)?.birClass ?? ''}
      />

      {error && <Text style={styles.errorLabel}>no selected expense</Text>}
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
  pickerContainerError: {
    width: '45%',
    borderBottomWidth: 1,
    borderColor: '$red',
  },
  errorLabel: {
    color: '$red',
    alignSelf: 'flex-end',
  },
})

export default ExpensePicker
