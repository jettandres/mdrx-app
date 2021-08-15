import React, { useCallback } from 'react'
import { FloatingAction } from 'react-native-floating-action'
import EStyleSheet from 'react-native-extended-stylesheet'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ExpensesReportsList from '@screens/ExpensesReportsList'
import MtpReportsList from '@screens/MtpReportsList'

import type { FC } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, HomeStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/native'

import salesIcon from '@images/baseline_sell_white_24dp.png'
import expenseIcon from '@images/baseline_payment_white_24dp.png'

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>

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
        // TODO: add navigation for Sales Report Form
      }
    },
    [navigation],
  )

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Expenses" component={ExpensesReportsList} />
        <Tab.Screen
          name="Mtp"
          component={MtpReportsList}
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

const styles = EStyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '$red',
  },
})

export default Home
