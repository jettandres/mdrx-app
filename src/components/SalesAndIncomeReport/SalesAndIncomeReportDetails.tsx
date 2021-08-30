import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { useRoute } from '@react-navigation/core'

const SalesAndIncomeReportDetails: FC = () => {
  const route = useRoute()

  return (
    <View style={styles.container}>
      <Text>{route.name}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SalesAndIncomeReportDetails
