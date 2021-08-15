import React from 'react'
import ReportsList from '@components/Home/ReportsList'

import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { RouteProp } from '@react-navigation/native'

import type { HomeStackParamList } from '../routes/types'

import type { FC } from 'react'

type ReportsListNavigationProp = MaterialTopTabNavigationProp<
  HomeStackParamList,
  'Mtp'
>

type ReportsListRouteProp = RouteProp<HomeStackParamList, 'Mtp'>

type Props = {
  navigation: ReportsListNavigationProp
  route: ReportsListRouteProp
}

const MtpReportsList: FC<Props> = () => {
  return <ReportsList reportType="mtp" />
}

export default MtpReportsList
