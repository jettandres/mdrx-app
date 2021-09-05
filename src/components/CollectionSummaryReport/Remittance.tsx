import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { CollectionSummaryTabParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

type RemittanceNavigationProp = MaterialTopTabNavigationProp<
  CollectionSummaryTabParamList,
  'Remittance'
>

type RemittanceRouteProp = RouteProp<
  CollectionSummaryTabParamList,
  'Remittance'
>

type Props = {
  navigation: RemittanceNavigationProp
  route: RemittanceRouteProp
}

const Remittance: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Remittance</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Remittance
