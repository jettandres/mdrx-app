import React, { useCallback } from 'react'
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
  const { route, navigation } = props
  const source = `file://${route.params.path}`

  const onRetry = useCallback(() => navigation.pop(), [navigation])
  const onConfirm = useCallback(() => {
    navigation.navigate('ExpensesReportForm', { imagePath: source })
  }, [navigation, source])

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: source }} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onRetry}>
          <Text style={styles.retryLabel}>RETRY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm}>
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
