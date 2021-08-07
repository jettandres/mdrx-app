import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

const ReviewReport: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Review Report</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$yellowBg',
  },
})

export default ReviewReport
