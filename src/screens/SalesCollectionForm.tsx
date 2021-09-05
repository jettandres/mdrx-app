import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'
import type { RootStackParamList } from '@routes/types'

import EStyleSheet from 'react-native-extended-stylesheet'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

type SalesCollectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SalesCollectionForm'
>
type SalesCollectionRouteProp = RouteProp<
  RootStackParamList,
  'SalesCollectionForm'
>

type Props = {
  navigation: SalesCollectionNavigationProp
  route: SalesCollectionRouteProp
}

const SalesCollectionForm: FC<Props> = (props) => {
  const { route } = props
  return (
    <View style={styles.container}>
      <Text>Sales Collection Form - {route.params.collectionType}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SalesCollectionForm
