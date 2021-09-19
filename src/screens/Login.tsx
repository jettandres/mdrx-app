import React, { useCallback, useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import type Employee from '@app/types/Employee'

import mdrxLogo from '@images/mdrx-logo.png'

import { RootStackParamList } from '@routes/types'
import HorizontalLabel from '@components/HorizontalLabel'

import { useLazyQuery } from '@apollo/client'
import { employeeInfo } from '@app/apollo/reactiveVariables'
import {
  GET_EMPLOYEES,
  GetEmployeesPayload,
  GetEmployeeResponse,
} from '@app/apollo/gql/employees'

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
  const [custodianCode, setCustodianCode] = useState<string | undefined>()
  const [errorLabel, setErrorLabel] = useState<string | undefined>()
  const [employee, setEmployee] = useState<Employee | undefined>()

  const [currentStep, setCurrentStep] = useState<WizardStep>(
    WizardStep.InputCustodianCode,
  )

  const [nextButtonCopy, setNextButtonCopy] = useState('Search')
  const [titleCopy, setTitleCopy] = useState('Custodian Code')

  const [getEmployee, { loading, error, data }] = useLazyQuery<
    GetEmployeeResponse,
    GetEmployeesPayload
  >(GET_EMPLOYEES, { fetchPolicy: 'no-cache' })

  useEffect(() => {
    if (currentStep === WizardStep.InputCustodianCode) {
      setNextButtonCopy('LOGIN')
      setTitleCopy('Custodian Code')
    } else if (currentStep === WizardStep.ConfirmCustodianCode) {
      setNextButtonCopy('CONFIRM')
      setTitleCopy('Employee Info')
    }
  }, [currentStep])

  const onNextButtonPress = useCallback(() => {
    if (currentStep === WizardStep.ConfirmCustodianCode && employee) {
      employeeInfo(employee)
      navigation.navigate('HomeDrawer')
    } else if (currentStep === WizardStep.InputCustodianCode) {
      if (custodianCode === undefined) {
        setErrorLabel('Field is required')
      } else {
        setErrorLabel(undefined)
        getEmployee({ variables: { code: custodianCode } })
      }
    }
  }, [navigation, currentStep, custodianCode, getEmployee, employee])

  useEffect(() => {
    if (data && data.employees.length) {
      const [employeeData] = data.employees
      setEmployee(employeeData)
      setCurrentStep(WizardStep.ConfirmCustodianCode)
    } else if (data && !data.employees.length) {
      setErrorLabel('Employee not found')
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setErrorLabel(error.message)
    }
  }, [error])

  const onPrevButtonPress = useCallback(() => {
    setEmployee(undefined)
    setCustodianCode(undefined)
    setCurrentStep(WizardStep.InputCustodianCode)
  }, [])

  const onChangeCustodianInput = useCallback((value: string | undefined) => {
    setCustodianCode(value)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={mdrxLogo} style={styles.logo} />
      <Text style={styles.titleLabel}>{titleCopy}</Text>
      {currentStep === WizardStep.InputCustodianCode && (
        <View style={styles.textInputContaienr}>
          <TextInput
            style={styles.textInput}
            placeholder="Custodian Code"
            value={custodianCode}
            onChangeText={onChangeCustodianInput}
          />
          {!!errorLabel && <Text style={styles.errorLabel}>{errorLabel}</Text>}
        </View>
      )}
      {currentStep === WizardStep.ConfirmCustodianCode && employee && (
        <View style={styles.userInfoContainer}>
          <HorizontalLabel title="Name" subtitle={employee.name} />
          <HorizontalLabel
            title="Assignment"
            subtitle={employee.custodianAssignment}
          />
          <HorizontalLabel title="Area" subtitle={employee.area} />
          <HorizontalLabel
            title="Contact No."
            subtitle={employee.contactNumber}
          />

          <HorizontalLabel title="Email" subtitle={employee.email} />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        {currentStep === WizardStep.ConfirmCustodianCode && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onPrevButtonPress}>
            <Text style={styles.cancelButtonLabel}>CANCEL</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={onNextButtonPress}>
          {loading && (
            <ActivityIndicator
              style={styles.loading}
              animating
              color="#007aff"
            />
          )}
          <Text style={styles.nextButtonLabel}>{nextButtonCopy}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '$white',
    paddingHorizontal: '$spacingSm',
    paddingTop: '25%',
  },
  logo: {
    height: 50,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: '$spacingMd',
  },
  titleLabel: {
    fontWeight: 'bold',
  },
  textInput: {
    color: '$dark',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: 8,
    paddingHorizontal: '$spacingSm',
  },
  textInputContaienr: {
    marginTop: '$spacingXs',
    marginBottom: '$spacingSm',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: '$spacingXs',
  },
  cancelButtonLabel: {
    color: '$red',
  },
  userInfoContainer: {
    width: '100%',
    marginBottom: '$spacingMd',
    marginTop: '$spacingSm',
  },
  errorLabel: {
    color: '$red',
  },
  nextButton: {
    flexDirection: 'row',
  },
  nextButtonLabel: {
    color: '$blue',
  },
  loading: {
    marginRight: '$spacingSm',
  },
})

export default Login
