import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import EStyleSheet from 'react-native-extended-stylesheet'
import * as faker from 'faker'

import type { FC } from 'react'
import HorizontalLabel from './HorizontalLabel'
import HorizontalInput from './HorizontalInput'

type Props = {
  onValueChange?: (value: string, index: number) => void
  selectedValue?: string
}

type CustomerType = 'new' | 'existing'

type Customer = {
  id: string
  name: string
  address: string
}

const customers: Array<Customer> = [
  {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: faker.address.streetAddress(true),
  },
  {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: faker.address.streetAddress(true),
  },
  {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: faker.address.streetAddress(true),
  },
  {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: faker.address.streetAddress(true),
  },
]

const CustomerPicker: FC<Props> = () => {
  const [selectedValue, setSelectedValue] = useState<CustomerType>('new')
  const onValueChange = useCallback((value: CustomerType) => {
    setSelectedValue(value)
  }, [])

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    customers[0],
  )

  const onSelectExistingCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer)
  }, [])

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>Customer Type</Text>
        <View style={styles.pickerContainer}>
          <Picker onValueChange={onValueChange} selectedValue={selectedValue}>
            <Picker.Item label="New" value="new" />
            <Picker.Item label="Existing" value="existing" />
          </Picker>
        </View>
      </View>
      {selectedValue === 'new' && (
        <View>
          <HorizontalInput
            title="Customer Name"
            placeholder={faker.company.companyName()}
          />
          <HorizontalInput
            title="Customer Address"
            placeholder={faker.address.streetAddress(true)}
          />
          <HorizontalInput title="TIN #" placeholder="45739720001" />
        </View>
      )}
      {selectedValue === 'existing' && (
        <>
          <View style={styles.container}>
            <Text>Customer Name</Text>
            <View style={styles.pickerContainer}>
              <Picker
                onValueChange={onSelectExistingCustomer}
                selectedValue={selectedCustomer}>
                {customers.map((c) => (
                  <Picker.Item key={c.id} label={c.name} value={c} />
                ))}
              </Picker>
            </View>
          </View>
          <HorizontalLabel
            title="Address"
            subtitle={selectedCustomer.address}
          />
        </>
      )}
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

export default CustomerPicker
