import React, { useCallback, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native'

import CameraRoll from '@react-native-community/cameraroll'

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
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  const [canWrite, setCanWrite] = useState<boolean>(false)

  const checkPermission = useCallback(async () => {
    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      setCanWrite(true)
    }

    const status = await PermissionsAndroid.request(permission)
    setCanWrite(status === 'granted')
  }, [permission])

  useEffect(() => {
    if (Platform.OS === 'android') {
      //eslint-disable-next-line @typescript-eslint/no-floating-promises
      checkPermission()
    }
    // TODO: add iOS permissions check
  }, [checkPermission])

  const onRetry = useCallback(() => navigation.pop(), [navigation])
  const onConfirm = useCallback(async () => {
    if (canWrite) {
      await CameraRoll.save(source, { type: 'photo' })
      navigation.navigate('ExpensesReportForm', { imagePath: source })
    } else {
      await checkPermission()
    }
  }, [canWrite, checkPermission, navigation, source])

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
