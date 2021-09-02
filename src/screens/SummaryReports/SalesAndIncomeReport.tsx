import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { DateTime } from 'luxon'

import {
  HomeDrawerParamList,
  SalesAndIncomeReportTabParamList,
} from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import SalesAndIncomeReportDetails from '@components/SalesAndIncomeReport/SalesAndIncomeReportDetails'
import HorizontalLabel from '@components/HorizontalLabel'
import HorizontalReportYearPicker from '@components/HorizontalReportYearPicker'

import { salesAndIncomeSelectedYear } from '@app/apollo/reactiveVariables'

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

const Tab = createMaterialTopTabNavigator<SalesAndIncomeReportTabParamList>()

const SalesAndIncomeReport: FC<Props> = () => {
  const currentYear = DateTime.now().year
  const [currentSelectedYear, setCurrentSelectedYear] =
    useState<number>(currentYear)

  const onReportYearChange = useCallback((value: number) => {
    setCurrentSelectedYear(value)
    salesAndIncomeSelectedYear(value)
  }, [])

  return (
    <>
      <HorizontalReportYearPicker
        selectedValue={currentSelectedYear}
        onPickerValueChange={onReportYearChange}
      />
      <Tab.Navigator>
        <Tab.Screen name="Invoice" component={SalesAndIncomeReportDetails} />
        <Tab.Screen
          name="DeliveryReceipt"
          component={SalesAndIncomeReportDetails}
          options={{ title: 'Delivery' }}
        />
        <Tab.Screen name="Cash" component={SalesAndIncomeReportDetails} />
      </Tab.Navigator>
      <View style={styles.footerContainer}>
        <Text style={styles.footerTitle}>YEAR TO DATE</Text>
        <HorizontalLabel bold title="Sales" subtitle="P7,536,950.00" />
        <HorizontalLabel title="Budget" subtitle="P8,230,000.00" />
        <HorizontalLabel title="Performance" subtitle="92%" />

        <View style={styles.footerSubcontainer}>
          <HorizontalLabel bold title="Income" subtitle="P3,878,562.00" />
          <HorizontalLabel title="Budget" subtitle="P3,200,000.00" />
          <HorizontalLabel title="Performance" subtitle="121%" />
        </View>
      </View>
    </>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: '$white',
    padding: '$spacingSm',
    borderColor: '$borderColor',
    borderTopWidth: 1,
  },
  footerSubcontainer: {
    paddingVertical: '$spacingSm',
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: '$xs',
    color: '$darkGray',
    marginBottom: '$spacingSm',
  },
})

export default SalesAndIncomeReport
