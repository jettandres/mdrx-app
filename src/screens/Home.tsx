import React, { useCallback, useEffect } from 'react'
import { FloatingAction } from 'react-native-floating-action'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ExpensesReportsList from '@screens/ExpensesReportsList'
import SalesReportsList from '@screens/SalesReportsList'

import type { FC } from 'react'

import { DrawerNavigationProp } from '@react-navigation/drawer'
import { HomeDrawerParamList, HomeStackParamList } from '@routes/types'
import { RouteProp, useNavigation } from '@react-navigation/native'

import salesIcon from '@images/baseline_sell_white_24dp.png'
import expenseIcon from '@images/baseline_payment_white_24dp.png'
import { HomeRouteNavigationProp } from '@routes/HomeRoute'

import { useMutation, useReactiveVar } from '@apollo/client'
import {
  MUTATION_NEW_EXPENSE_REPORT,
  NewExpenseReportPayload,
  NewExpenseReportResponse,
  QUERY_EXPENSE_REPORTS,
} from '@app/apollo/gql/expense'
import { DateTime } from 'luxon'
import { employeeInfo } from '@app/apollo/reactiveVariables'

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

const Home: FC<Props> = () => {
  const navigation = useNavigation<HomeRouteNavigationProp>()
  const employeeData = useReactiveVar(employeeInfo)
  const [newExpense, { data, error }] = useMutation<
    NewExpenseReportResponse,
    NewExpenseReportPayload
  >(MUTATION_NEW_EXPENSE_REPORT)

  useEffect(() => {
    if (data) {
      navigation.navigate('ExpensesReportForm', {
        id: data.data.id,
        reportNumber: data.data.reportNumber,
      })
    } else if (error) {
      console.log(error)
    }
  }, [data, error, navigation])

  const onFabTap = useCallback(
    async (name?: string | undefined) => {
      if (name === 'expenses') {
        const epochTime: string = DateTime.now().toSeconds().toFixed(0)
        const employeeId = employeeData?.id ?? ''
        const employeeCode: string = employeeId.split('-')[4]
        const reportNumber = `${employeeCode}-${epochTime}`
        const payload: NewExpenseReportPayload = {
          expenseReport: {
            status: 'DRAFT',
            employee_id: employeeId,
            report_number: reportNumber,
          },
        }

        await newExpense({
          variables: payload,
          refetchQueries: [
            {
              query: QUERY_EXPENSE_REPORTS,
              variables: {
                employeeId: employeeId,
              },
            },
          ],
        })
      } else if (name === 'sales') {
        navigation.navigate('SalesReportForm')
      }
    },
    [employeeData?.id, navigation, newExpense],
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
