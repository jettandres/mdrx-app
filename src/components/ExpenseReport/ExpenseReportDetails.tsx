import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {}

const ExpenseReportDetails = () => {
  return (
    <View style={styles.container}>
      <Text>Expense Report Details</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ExpenseReportDetails
