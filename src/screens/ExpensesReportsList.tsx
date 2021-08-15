import React from 'react'
import ReportsList from '@components/Home/ReportsList'

import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { RouteProp } from '@react-navigation/native'

import type { HomeStackParamList } from '../routes/types'

import type { FC } from 'react'

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
  return <ReportsList reportType="expenses" />
}

export default ExpensesReportsList
