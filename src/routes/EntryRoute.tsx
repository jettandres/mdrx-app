import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type { FC } from 'react'

import Home from '@screens/Home'
import ReviewExpenseReport from '@screens/ReviewExpenseReport'
import Login from '@screens/Login'
import ExpensesReportForm from '@screens/ExpensesReportForm'
import SalesReportForm from '@screens/SalesReportForm'
import ReviewSalesReport from '@screens/ReviewSalesReport'

import { RootStackParamList } from '@routes/types'

import HomeRoute from '@routes/HomeRoute'
import SalesCollectionForm from '@screens/SalesCollectionForm'

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
        name="HomeDrawer"
        options={{ headerShown: false }}
        component={HomeRoute}
      />
      <Stack.Screen
        name="ReviewExpenseReport"
        options={{ title: 'Review Report' }}
        component={ReviewExpenseReport}
      />
      <Stack.Screen
        name="ReviewSalesReport"
        options={{ title: 'Review Report' }}
        component={ReviewSalesReport}
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
      <Stack.Screen
        name="SalesCollectionForm"
        options={{ title: 'Sales Collection Form' }}
        component={SalesCollectionForm}
      />
    </Stack.Navigator>
  )
}

export default EntryRoute
