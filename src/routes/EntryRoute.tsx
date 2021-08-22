import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type { FC } from 'react'

import Home from '@screens/Home'
import ReviewExpenseReport from '@screens/ReviewExpenseReport'
import Login from '@screens/Login'
import ExpensesReportForm from '@screens/ExpensesReportForm'
import SalesReportForm from '@screens/SalesReportForm'

import { RootStackParamList } from '@routes/types'

const EntryRoute: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Home"
        options={{ title: 'Welcome, Johnny' }}
        component={Home}
      />
      <Stack.Screen
        name="ReviewExpenseReport"
        options={{ title: 'Review Report' }}
        component={ReviewExpenseReport}
      />
      <Stack.Screen
        name="ExpensesReportForm"
        options={{ title: 'Expenses Recording' }}
        component={ExpensesReportForm}
      />
      <Stack.Screen
        name="SalesReportForm"
        options={{ title: 'Sales Recording' }}
        component={SalesReportForm}
      />
    </Stack.Navigator>
  )
}

export default EntryRoute
