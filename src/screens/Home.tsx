import React, { useCallback } from 'react'
import { FloatingAction } from 'react-native-floating-action'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ExpensesReportsList from '@screens/ExpensesReportsList'
import SalesReportsList from '@screens/SalesReportsList'

import type { FC } from 'react'

import { DrawerNavigationProp } from '@react-navigation/drawer'
import { HomeDrawerParamList, HomeStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/native'

import salesIcon from '@images/baseline_sell_white_24dp.png'
import expenseIcon from '@images/baseline_payment_white_24dp.png'

type HomeNavigationProp = DrawerNavigationProp<HomeDrawerParamList, 'Home'>
type HomeRouteProp = RouteProp<HomeDrawerParamList, 'Home'>

type Props = {
  navigation: HomeNavigationProp
  route: HomeRouteProp
}

const Tab = createMaterialTopTabNavigator<HomeStackParamList>()

const fabActions = [
  {
    text: 'Expenses Recording',
    name: 'expenses',
    position: 1,
    icon: expenseIcon,
  },
  {
    text: 'Sales Recording',
    name: 'sales',
    position: 2,
    icon: salesIcon,
  },
]

const Home: FC<Props> = (props) => {
  const { navigation } = props

  const onFabTap = useCallback(
    (name?: string | undefined) => {
      if (name === 'expenses') {
        navigation.navigate('ExpensesReportForm')
      } else if (name === 'sales') {
        navigation.navigate('SalesReportForm')
      }
    },
    [navigation],
  )

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Expenses" component={ExpensesReportsList} />
        <Tab.Screen
          name="Sales"
          component={SalesReportsList}
          options={{ title: 'Sales' }}
        />
      </Tab.Navigator>
      <FloatingAction
        onPressItem={onFabTap}
        color="#007aff"
        actions={fabActions}
      />
    </>
  )
}

export default Home
