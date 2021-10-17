import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  message?: string
}

const LoadingScreen: FC<Props> = (props) => {
  const { message = 'Loading...' } = props
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color="#007aff" />
      <Text style={styles.loadingLabel}>{message}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$white',
  },
  loadingLabel: {
    color: '$darkGray',
    marginTop: '$spacingSm',
  },
})

export default LoadingScreen
