import React from 'react'
import { View, Text } from 'react-native'
import { DateTime } from 'luxon'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { HomeDrawerParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ExpenseReportDetails from '@components/ExpenseReport/ExpenseReportDetails'

type ExpenseReportNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  'ExpenseReport'
>
type ExpenseReportRouteProp = RouteProp<HomeDrawerParamList, 'ExpenseReport'>

type Props = {
  navigation: ExpenseReportNavigationProp
  route: ExpenseReportRouteProp
}

const Tab = createMaterialTopTabNavigator()

const ExpenseReport: FC<Props> = () => {
  const currentYear = DateTime.now().year
  const tabAmounts: number = DateTime.now().month
  const tabScreens: Array<JSX.Element> = []

  for (let x = 1; x <= tabAmounts; x++) {
    const screenName = DateTime.fromFormat(x.toString(), 'M').toFormat(
      `MMM ${currentYear}`,
    )

    const screen: JSX.Element = (
      <Tab.Screen
        key={x.toString()}
        name={screenName}
        component={ExpenseReportDetails}
      />
    )
    tabScreens.push(screen)
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: styles.tabBarItem,
        }}>
        {tabScreens}
      </Tab.Navigator>
    </>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarItem: {
    width: 100,
  },
})

export default ExpenseReport
