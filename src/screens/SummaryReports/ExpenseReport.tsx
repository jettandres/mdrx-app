import React, { useCallback, useState } from 'react'
import { DateTime } from 'luxon'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { HomeDrawerParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ExpenseReportDetails from '@components/ExpenseReport/ExpenseReportDetails'
import HorizontalReportYearPicker from '@components/HorizontalReportYearPicker'

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
  const [currentSelectedYear, setCurrentSelectedYear] =
    useState<number>(currentYear)

  const tabAmounts: number =
    currentYear === currentSelectedYear ? DateTime.now().month : 12

  const tabScreens: Array<JSX.Element> = []

  for (let x = 1; x <= tabAmounts; x++) {
    const screenName = DateTime.fromFormat(x.toString(), 'M').toFormat(
      `MMM ${currentSelectedYear}`,
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

  const onReportYearChange = useCallback(
    (value) => setCurrentSelectedYear(value),
    [],
  )

  return (
    <>
      <HorizontalReportYearPicker
        selectedValue={currentSelectedYear}
        onPickerValueChange={onReportYearChange}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: styles.tabBarItem,
        }}>
        {tabScreens}
        <Tab.Screen name="Total" component={ExpenseReportDetails} />
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
