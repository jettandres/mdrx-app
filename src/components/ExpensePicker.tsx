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
    label: 'Representation Meals',
    value: 'representation meals',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Medicine',
    value: 'medicine',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Insurance',
    value: 'insurance',
    expenseClass: 'VATable services',
  },
  {
    label: 'Courier',
    value: 'courier',
    expenseClass: 'VATable services',
  },
  {
    label: 'Cost of Loan Interest',
    value: 'cost of loan interest',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Office Fixtures',
    value: 'office fixtures',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Local Capital Goods',
    value: 'local capital goods',
    expenseClass: 'Capital Goods',
  },
  {
    label: 'Imported Capital goods',
    value: 'imported capital goods',
    expenseClass: 'Capital Goods',
  },
  {
    label: 'Parking w/ VAT',
    value: 'parking with vat',
    expenseClass: 'VATable services',
  },
  {
    label: 'Mobile Phone Bill',
    value: 'mobile phone bill',
    expenseClass: 'VATable services',
  },
  {
    label: 'Landline Phone Bill',
    value: 'landline phone bill',
    expenseClass: 'VATable services',
  },
  {
    label: 'Electric Bill',
    value: 'electric bill',
    expenseClass: 'VATable services',
  },
  {
    label: 'Water Bill',
    value: 'water bill',
    expenseClass: 'VATable services',
  },
  {
    label: 'Bid Document',
    value: 'bid document',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Product Registration',
    value: 'product registration',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Business Permit',
    value: 'business permit',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'BIR Tax 2550M',
    value: 'bir tax 2550m',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'BIR Tax 2550Q',
    value: 'bir tax 2550q',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'BIR Tax 1701Q',
    value: 'bir tax 1701',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Penalties',
    value: 'penalties',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Hardware',
    value: 'hardware',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Notary Service',
    value: 'notary service',
    expenseClass: 'VAT Exempt Service',
  },
  {
    label: 'Bus',
    value: 'bus',
    expenseClass: 'Services',
  },
  {
    label: 'Taxi',
    value: 'taxi',
    expenseClass: 'Services',
  },
  {
    label: 'Tricycle',
    value: 'tricycle',
    expenseClass: 'VAT Exempt Service',
  },
  {
    label: 'Forwarding Service',
    value: 'forwarding service',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Warehouse/Storage Service',
    value: 'warehouse storage service',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Cost of Loan Interest',
    value: 'cost of loan interest',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Outsourced Training',
    value: 'outsource training',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Air Fare',
    value: 'air fare',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Professional Accounting Service',
    value: 'professional accounting service',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Professional Programming Services',
    value: 'professional programming services',
    expenseClass: 'VAT Exempt',
  },
  {
    label: 'Standard Meals',
    value: 'standard meals',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Hotel',
    value: 'hotel',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Grab',
    value: 'grab',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Medicine',
    value: 'medicine',
    expenseClass: 'VAT Exempt Purchase',
  },
  {
    label: 'HMO',
    value: 'hmo',
    expenseClass: 'VAT Exempt Service',
  },
  {
    label: 'Motor Car Service Maintenance',
    value: 'motor car service maintenance',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Motor Car Parts & Consumable',
    value: 'motor car parts and consumable',
    expenseClass: 'Goods other than capital goods',
  },
  {
    label: 'Office Rent',
    value: 'office rent',
    expenseClass: 'VATable Services',
  },
  {
    label: 'Parking w/o VAT',
    value: 'parking without vat',
    expenseClass: 'VAT Exempt Service',
  },
  {
    label: 'Out Based Meals',
    value: 'out based meals',
    expenseClass: '',
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
