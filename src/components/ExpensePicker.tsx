import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import HorizontalLabel from '@components/HorizontalLabel'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { Control } from 'react-hook-form'

import { useController } from 'react-hook-form'

import { useQuery } from '@apollo/client'
import { GET_EXPENSE, GetExpenseResponse } from '@app/apollo/gql/expense'
import Expense from '@app/types/Expense'

type Props = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}

const ExpensePicker: FC<Props> = (props) => {
  const { control, name } = props
  const { data } = useQuery<GetExpenseResponse>(GET_EXPENSE)
  const { field } = useController({
    control,
    name,
    defaultValue: data?.expense[0],
  })

  if (!data) {
    return null
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>Expense</Text>
        <View style={styles.pickerContainer}>
          <Picker
            onValueChange={(v: Expense) => field.onChange(v.id)}
            selectedValue={data.expense.find((e) => e.id === field.value)}>
            {data.expense.map((e) => (
              <Picker.Item key={e.id} label={e.name} value={e} />
            ))}
          </Picker>
        </View>
      </View>
      <HorizontalLabel
        title="Class"
        subtitle={(field.value as Expense).birClass ?? ''}
      />
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
