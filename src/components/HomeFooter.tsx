import React from 'react'
import { View, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  onNext: () => void
  onEnd: () => void
  onReview: () => void
}

const HeaderFooter: FC<Props> = (props) => {
  const { onNext, onEnd, onReview } = props
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Next" onPress={onNext} />
        <Button title="End Report" onPress={onEnd} />
        <Button title="Review Report" onPress={onReview} />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  buttonsContainer: {
    height: 120,
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

export default HeaderFooter
