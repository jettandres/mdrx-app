import React, { useCallback } from 'react'
import { View, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/native'

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>

type Props = {
  navigation: HomeNavigationProp
  route: HomeRouteProp
}

const Home: FC<Props> = (props) => {
  const { navigation } = props
  const onButtonPress = useCallback(
    () => navigation.navigate('ReviewReport'),
    [navigation],
  )
  return (
    <View style={styles.container}>
      <Button title="Click me" onPress={onButtonPress} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$primary',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
