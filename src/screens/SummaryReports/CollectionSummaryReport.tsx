import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'

import { HomeDrawerParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'

type CollectionSummaryReportNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  'CollectionSummaryReport'
>
type CollectionSummaryReportRouteProp = RouteProp<
  HomeDrawerParamList,
  'CollectionSummaryReport'
>

type Props = {
  navigation: CollectionSummaryReportNavigationProp
  route: CollectionSummaryReportRouteProp
}

const CollectionSummaryReport: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Collection Summary Report</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CollectionSummaryReport
