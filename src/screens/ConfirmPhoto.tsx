import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@routes/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type ConfirmPhotoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConfirmPhoto'
>
type ConfirmPhotoRouteProp = RouteProp<RootStackParamList, 'ConfirmPhoto'>

type Props = {
  navigation: ConfirmPhotoNavigationProp
  route: ConfirmPhotoRouteProp
}

const ConfirmPhoto: FC<Props> = (props) => {
  const { route } = props
  const source = `file://${route.params.path}`
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: source }} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <Text style={styles.retryLabel}>RETRY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.confirmLabel}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '90%',
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
  },
  divider: {
    width: '$spacingLg',
  },
  retryLabel: {
    color: '$red',
  },
  confirmLabel: {
    color: '$blue',
  },
})

export default ConfirmPhoto
