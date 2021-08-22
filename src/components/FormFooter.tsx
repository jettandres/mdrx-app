import React from 'react'
import { View, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  onNext: () => void
  onReview: () => void
}

const FormFooter: FC<Props> = (props) => {
  const { onNext, onReview } = props
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Next" onPress={onNext} />
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
    height: 80,
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

export default FormFooter
