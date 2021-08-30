import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { useRoute } from '@react-navigation/native'

const ExpenseReportDetails: FC = () => {
  const route = useRoute()
  if (route.name === 'Total') {
    // TODO: display total instead
  }

  return (
    <View style={styles.container}>
      <Text>{route.name}</Text>
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
