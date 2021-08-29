import React, { useCallback, useState } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

import StepOne from './StepOne'
import StepTwo from './StepTwo'

type SalesReportFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SalesReportForm'
>
type SalesReportFormRouteProp = RouteProp<RootStackParamList, 'SalesReportForm'>

type Props = {
  navigation: SalesReportFormNavigationProp
  route: SalesReportFormRouteProp
}

const SalesReportForm: FC<Props> = (props) => {
  const { navigation } = props
  const [currentStep, setCurrentStep] = useState<number>(0)

  const onStepOneNext = useCallback(() => {
    setCurrentStep(1)
  }, [])

  const onStepTwoNext = useCallback(() => {}, [])

  const onStepTwoReview = useCallback(
    () => navigation.navigate('ReviewSalesReport'),
    [navigation],
  )

  const onStepTwoBack = useCallback(() => {
    setCurrentStep(0)
    return false
  }, [])

  if (currentStep === 0) {
    return <StepOne onNext={onStepOneNext} />
  }

  return (
    <StepTwo
      onNext={onStepTwoNext}
      onReview={onStepTwoReview}
      onBack={onStepTwoBack}
    />
  )
}

export default SalesReportForm
