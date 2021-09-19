import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

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

const CapturePhoto: FC<Props> = (props) => {
  const { navigation } = props
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

  const camera = useRef<Camera>(null)
  const noPermission = permission !== 'authorized'

  const devices = useCameraDevices()
  const device = devices.back

  const onTakePhoto = useCallback(async () => {
    try {
      const photo = await camera.current?.takePhoto()
      // TODO: save photo.path
      console.log('success', photo)
      if (photo) {
        navigation.navigate('ConfirmPhoto', { path: photo.path })
      }
    } catch (e) {
      console.log(e)
    }
  }, [navigation])

  if (noPermission || !device) {
    return (
      <View style={styles.container}>
        {noPermission && <Text>Please enable camera permission</Text>}
      </View>
    )
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity onPress={onTakePhoto} style={styles.captureButtonOuter}>
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  captureButtonOuter: {
    height: 80,
    width: 80,
    borderColor: '$white',
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '$spacingSm',
  },
  captureButtonInner: {
    height: 40,
    width: 40,
    backgroundColor: '$blue',
    borderRadius: 20,
  },
})

export default CapturePhoto
