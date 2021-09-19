import React, { useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Camera } from 'react-native-vision-camera'

import type { FC } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

type CapturePhotoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CapturePhoto'
>
type CapturePhotoRouteProp = RouteProp<RootStackParamList, 'CapturePhoto'>

type Props = {
  navigation: CapturePhotoNavigationProp
  route: CapturePhotoRouteProp
}

const CapturePhoto: FC<Props> = () => {
  const [permission, setPermission] = useState<'authorized' | 'denied'>(
    'denied',
  )
  const requestCameraPermission = useCallback(async () => {
    const cameraPermission = await Camera.requestCameraPermission()
    setPermission(cameraPermission)
  }, [])

  useEffect(() => {
    //eslint-disable-next-line @typescript-eslint/no-floating-promises
    requestCameraPermission()
  }, [requestCameraPermission])

  return (
    <View style={styles.container}>
      <Text>{permission}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CapturePhoto
