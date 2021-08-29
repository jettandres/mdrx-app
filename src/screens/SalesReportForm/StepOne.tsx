import React, { useCallback } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import CustomerPicker from '@components/CustomerPicker'

import { currentDate } from '@utils/date'

type Props = {
  onNext: () => void
}

const StepOne: FC<Props> = (props) => {
  const { onNext } = props
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.reportLabelContainer}>
          <HorizontalLabel bold title="TPR #" subtitle="Min07021" />
        </View>
        <HorizontalLabel title="Date Reported" subtitle={currentDate} />
        <HorizontalLabel
          title="Assignment"
          subtitle="Mindanao Sales & Marketing"
        />
        <CustomerPicker />
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={onNext} />
        </View>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '$spacingLg',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: '$spacingMd',
  },
  reportLabelContainer: {
    marginBottom: '$spacingSm',
  },
  buttonContainer: {
    marginTop: '$spacingLg',
  },
})

export default StepOne
