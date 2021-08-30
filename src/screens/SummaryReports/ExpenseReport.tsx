import React, { useCallback, useState } from 'react'
import { View, Text } from 'react-native'
import { DateTime } from 'luxon'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { HomeDrawerParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ExpenseReportDetails from '@components/ExpenseReport/ExpenseReportDetails'
import HorizontalPicker, { PickerItem } from '@components/HorizontalPicker'

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

const YearPickerItems: Array<PickerItem> = [
  {
    label: '2020',
    value: 2020,
  },
  {
    label: '2021',
    value: 2021,
  },
]

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

  const onPickerValueChange = useCallback(
    (value) => setCurrentSelectedYear(value),
    [],
  )

  return (
    <>
      <View style={styles.header}>
        <HorizontalPicker
          borderless
          onValueChange={onPickerValueChange}
          selectedValue={currentSelectedYear}
          title="Report Year"
          items={YearPickerItems}
        />
      </View>
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
  header: {
    backgroundColor: '$white',
    paddingHorizontal: '$spacingSm',
  },
})

export default ExpenseReport
