import React from 'react'
import ReportsList from '@components/Home/ReportsList'

import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { RouteProp } from '@react-navigation/native'

import type { HomeStackParamList } from '../routes/types'

import type { FC } from 'react'

type ReportsListNavigationProp = MaterialTopTabNavigationProp<
  HomeStackParamList,
  'Sales'
>

type ReportsListRouteProp = RouteProp<HomeStackParamList, 'Sales'>

type Props = {
  navigation: ReportsListNavigationProp
  route: ReportsListRouteProp
}

const SalesReportsList: FC<Props> = () => {
  return <ReportsList reportType="sales" />
}

export default SalesReportsList
