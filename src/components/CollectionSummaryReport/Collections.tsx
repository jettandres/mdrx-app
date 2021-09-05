import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { CollectionSummaryTabParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

type CollectionsNavigationProp = MaterialTopTabNavigationProp<
  CollectionSummaryTabParamList,
  'Collections'
>

type CollectionsRouteProp = RouteProp<
  CollectionSummaryTabParamList,
  'Collections'
>

type Props = {
  navigation: CollectionsNavigationProp
  route: CollectionsRouteProp
}

const Collections: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Collections</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Collections
