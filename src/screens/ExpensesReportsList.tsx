import React from 'react'
import ReportsList from '@components/Home/ReportsList'

import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { RouteProp } from '@react-navigation/native'

import type { HomeStackParamList } from '../routes/types'

import type { FC } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  QueryExpenseReportsResponse,
  QueryExpenseReportsPayload,
  QUERY_EXPENSE_REPORTS,
} from '@app/apollo/gql/expense'
import { employeeInfo } from '@app/apollo/reactiveVariables'
import { ActivityIndicator } from 'react-native'

type ReportsListNavigationProp = MaterialTopTabNavigationProp<
  HomeStackParamList,
  'Expenses'
>
type ReportsListRouteProp = RouteProp<HomeStackParamList, 'Expenses'>

type Props = {
  navigation: ReportsListNavigationProp
  route: ReportsListRouteProp
}

const ExpensesReportsList: FC<Props> = () => {
  const employeeData = useReactiveVar(employeeInfo)

  const { data, loading } = useQuery<
    QueryExpenseReportsResponse,
    QueryExpenseReportsPayload
  >(QUERY_EXPENSE_REPORTS, {
    variables: {
      employeeId: employeeData?.id ?? '',
    },
  })

  if (!data || loading) {
    return <ActivityIndicator animating color="#007aff" />
  }

  return <ReportsList data={data.expenseReports} />
}

export default ExpensesReportsList
