import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

const UnderConstruction: FC = () => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="construction" size={50} color="#202020" />
      <Text>This page is under construction</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: '$spacingSm',
  },
})

export default UnderConstruction
