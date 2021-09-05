import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import {
  CollectionSummaryTabParamList,
  HomeDrawerParamList,
} from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Collections from '@components/CollectionSummaryReport/Collections'
import Remittance from '@components/CollectionSummaryReport/Remittance'

type CollectionSummaryReportNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  'CollectionSummaryReport'
>
type CollectionSummaryReportRouteProp = RouteProp<
  HomeDrawerParamList,
  'CollectionSummaryReport'
>

const Tab = createMaterialTopTabNavigator<CollectionSummaryTabParamList>()

type Props = {
  navigation: CollectionSummaryReportNavigationProp
  route: CollectionSummaryReportRouteProp
}

const CollectionSummaryReport: FC<Props> = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Collections" component={Collections} />
        <Tab.Screen name="Remittance" component={Remittance} />
      </Tab.Navigator>
    </>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CollectionSummaryReport
