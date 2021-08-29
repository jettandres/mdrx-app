import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { HomeDrawerParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'

type SalesAndIncomeReportNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  'SalesAndIncomeReport'
>
type SalesAndIncomeReportRouteProp = RouteProp<
  HomeDrawerParamList,
  'SalesAndIncomeReport'
>

type Props = {
  navigation: SalesAndIncomeReportNavigationProp
  route: SalesAndIncomeReportRouteProp
}

const SalesAndIncomeReport: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>YTD Sales and Income Report</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SalesAndIncomeReport
