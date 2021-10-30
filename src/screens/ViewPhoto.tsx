import React from 'react'
import { Image, Text, View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import type { FC } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

import { Storage } from 'aws-amplify'
import { useAsync } from 'react-async-hook'
import LoadingScreen from '@components/common/LoadingScreen'

type ViewPhotoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ViewPhoto'
>

type ViewPhotoRouteProp = RouteProp<RootStackParamList, 'ViewPhoto'>

type Props = {
  navigation: ViewPhotoNavigationProp
  route: ViewPhotoRouteProp
}

const ViewPhoto: FC<Props> = (props) => {
  const { route } = props
  const imageKey = route?.params.imageKey

  const asyncImageUrl = useAsync(() => Storage.get(imageKey), [])

  if (asyncImageUrl.loading && !asyncImageUrl.result) {
    return <LoadingScreen message="Loading image" />
  }

  if (asyncImageUrl.error) {
    return (
      <View style={styles.container}>
        <Text>Error retrieving photo</Text>
        <Text>{asyncImageUrl.error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: asyncImageUrl.result }} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '$white',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
})

export default ViewPhoto
