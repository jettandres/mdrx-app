import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { HomeDrawerParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'

type ExpenseReportNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  'ExpenseReport'
>
type ExpenseReportRouteProp = RouteProp<HomeDrawerParamList, 'ExpenseReport'>

type Props = {
  navigation: ExpenseReportNavigationProp
  route: ExpenseReportRouteProp
}

const ExpenseReport: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>YTD Expense Report</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ExpenseReport
