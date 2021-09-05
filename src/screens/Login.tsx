import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@routes/types'
import HorizontalLabel from '@components/HorizontalLabel'

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>
type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>

type Props = {
  navigation: LoginNavigationProp
  route: LoginRouteProp
}

enum WizardStep {
  InputCustodianCode,
  ConfirmCustodianCode,
}

const Login: FC<Props> = (props) => {
  const { navigation } = props

  const [currentStep, setCurrentStep] = useState<WizardStep>(
    WizardStep.InputCustodianCode,
  )

  const [nextButtonCopy, setNextButtonCopy] = useState('Search')
  const [titleCopy, setTitleCopy] = useState('Custodian Code')

  useEffect(() => {
    if (currentStep === WizardStep.InputCustodianCode) {
      setNextButtonCopy('Search')
      setTitleCopy('Custodian Code')
    } else if (currentStep === WizardStep.ConfirmCustodianCode) {
      setNextButtonCopy('Confirm')
      setTitleCopy('Employee Info')
    }
  }, [currentStep])

  const onNextButtonPress = useCallback(() => {
    if (currentStep === WizardStep.ConfirmCustodianCode) {
      navigation.navigate('HomeDrawer')
    } else if (currentStep === WizardStep.InputCustodianCode) {
      // TODO: retrieve from database
      setCurrentStep(WizardStep.ConfirmCustodianCode)
    }
  }, [navigation, currentStep])

  const onPrevButtonPress = useCallback(
    () => setCurrentStep(WizardStep.InputCustodianCode),
    [],
  )

  return (
    <View style={styles.container}>
      <Text>{titleCopy}</Text>
      {currentStep === WizardStep.InputCustodianCode && (
        <TextInput style={styles.textInput} placeholder="Custodian Code" />
      )}
      {currentStep === WizardStep.ConfirmCustodianCode && (
        <View style={styles.userInfoContainer}>
          <HorizontalLabel title="Name" subtitle="Johnny Cash " />
          <HorizontalLabel
            title="Assignment"
            subtitle="Mindanao Sales & Marketing"
          />
          <HorizontalLabel title="Area" subtitle="Manila" />
          <HorizontalLabel title="Contact No." subtitle="0906123456" />

          <HorizontalLabel title="Email" subtitle="johnny@mdrx.net" />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        {currentStep === WizardStep.ConfirmCustodianCode && (
          <View style={styles.cancelButton}>
            <Button title="Cancel" onPress={onPrevButtonPress} />
          </View>
        )}
        <Button title={nextButtonCopy} onPress={onNextButtonPress} />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: 8,
    marginTop: '$spacingXs',
    marginBottom: '$spacingSm',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    marginRight: '$spacingXs',
  },
  userInfoContainer: {
    width: '80%',
    marginBottom: '$spacingMd',
    marginTop: '$spacingSm',
  },
})

export default Login
