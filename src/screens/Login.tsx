import React, { useCallback, useState, useEffect, useMemo } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
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

import { Auth } from 'aws-amplify'
import LoadingScreen from '@components/common/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import formatCurrency from '@utils/formatCurrency'
import { dinero } from 'dinero.js'

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
  InputUsernameAndPassword,
  ConfirmCustodianCode,
}

const Login: FC<Props> = (props) => {
  const { navigation } = props

  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()

  const [errorLabel, setErrorLabel] = useState<string | undefined>()
  const [employee, setEmployee] = useState<Employee | undefined>()
  const [loginLoading, setLoginLoading] = useState(false)

  const [currentStep, setCurrentStep] = useState<WizardStep>(
    WizardStep.InputUsernameAndPassword,
  )

  const [nextButtonCopy, setNextButtonCopy] = useState('Search')
  const [titleCopy, setTitleCopy] = useState('Custodian Code')

  const [getEmployee, { loading, error, data }] = useLazyQuery<
    GetEmployeeResponse,
    GetEmployeesPayload
  >(GET_EMPLOYEES, { fetchPolicy: 'no-cache' })

  const hasNoAreaAssignment = useMemo(() => {
    return !employee?.custodianAssignment || !employee?.area || !employee?.funds
  }, [employee])

  useEffect(() => {
    if (currentStep === WizardStep.InputUsernameAndPassword) {
      setNextButtonCopy('LOGIN')
      setTitleCopy('Employee Login')
    } else if (currentStep === WizardStep.ConfirmCustodianCode) {
      setNextButtonCopy('CONFIRM')
      setTitleCopy('Employee Info')
    }
  }, [currentStep])

  const resetFormState = useCallback(() => {
    setEmail(undefined)
    setPassword(undefined)
    setErrorLabel(undefined)
    setCurrentStep(WizardStep.InputUsernameAndPassword)
  }, [])

  const onNextButtonPress = useCallback(async () => {
    if (
      currentStep === WizardStep.InputUsernameAndPassword &&
      email &&
      password
    ) {
      setLoginLoading(true)
      setErrorLabel(undefined)
      try {
        //const resp = await Auth.signIn('jettrobin.andres@gmail.com', 'Passw0rd!')
        const resp = await Auth.signIn(email, password)
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const token = resp.signInUserSession.idToken.jwtToken as string
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const userId = resp.attributes.sub as string
        setLoginLoading(false)

        await AsyncStorage.setItem('@token', token)
        getEmployee({ variables: { id: userId } })
      } catch (e) {
        setLoginLoading(false)
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        const code = (e as any)?.code
        if (code === 'UserNotConfirmedException') {
          navigation.navigate('VerificationCode', {
            email,
            password,
            source: 'Login',
          })
        } else if (code === 'UserNotFoundException') {
          setErrorLabel('Incorrect username/password')
        }
      }
    } else if (currentStep === WizardStep.ConfirmCustodianCode && employee) {
      if (!hasNoAreaAssignment) {
        try {
          employeeInfo(employee)
          navigation.navigate('HomeDrawer')
          resetFormState()
        } catch (e) {
          console.log('error logging in', e)
        }
      } else {
        Alert.alert(
          'Employee Verification Required',
          'Please contact MDRx Admin to update your Funds, Area and Custodian Assignment.',
        )
      }
    }
  }, [
    currentStep,
    email,
    password,
    employee,
    getEmployee,
    navigation,
    hasNoAreaAssignment,
    resetFormState,
  ])

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
    setCurrentStep(WizardStep.InputUsernameAndPassword)
  }, [])

  const onChangeEmailInput = useCallback((value: string | undefined) => {
    setEmail(value)
  }, [])

  const onChangePasswordInput = useCallback((value: string | undefined) => {
    setPassword(value)
  }, [])

  const onSignUpButtonPress = useCallback(() => {
    navigation.navigate('SignUp')
  }, [navigation])

  if (loading || loginLoading) {
    const message = loading ? 'Retrieving employee details' : 'Logging in'
    return <LoadingScreen message={message} />
  }

  return (
    <View style={styles.container}>
      <Image source={mdrxLogo} style={styles.logo} />
      <Text style={styles.titleLabel}>{titleCopy}</Text>
      {currentStep === WizardStep.InputUsernameAndPassword && (
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.loginInput}
            placeholder="Email"
            value={email}
            onChangeText={onChangeEmailInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={onChangePasswordInput}
          />
          {!!errorLabel && <Text style={styles.errorLabel}>{errorLabel}</Text>}
        </View>
      )}
      {currentStep === WizardStep.ConfirmCustodianCode && employee && (
        <View style={styles.userInfoContainer}>
          <HorizontalLabel title="Name" subtitle={employee.name} />
          <HorizontalLabel
            title="Custodian Assignment"
            subtitle={employee.custodianAssignment}
          />
          <HorizontalLabel title="Area" subtitle={employee.area} />
          <HorizontalLabel
            title="Contact No."
            subtitle={employee.contactNumber}
          />

          <HorizontalLabel title="Email" subtitle={employee.email} />
          {employee?.funds && (
            <HorizontalLabel
              title="Funds"
              subtitle={formatCurrency(dinero(employee.funds))}
            />
          )}
          {hasNoAreaAssignment && (
            <Text style={styles.errorLabelVerif}>
              Please contact MDRx Admin to update your Funds, Area, and
              Custodian Assignment
            </Text>
          )}
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
          <Text style={styles.nextButtonLabel}>{nextButtonCopy}</Text>
        </TouchableOpacity>
        {currentStep === WizardStep.InputUsernameAndPassword && (
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onSignUpButtonPress}>
            <Text style={styles.signUpButtonLabel}>SIGN UP</Text>
          </TouchableOpacity>
        )}
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
    paddingHorizontal: '$spacingSm',
    paddingBottom: '25%',
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
  textInputContainer: {
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
  errorLabelVerif: {
    color: '$red',
    marginTop: '$spacingSm',
  },
  nextButton: {
    flexDirection: 'row',
  },
  nextButtonLabel: {
    color: '$blue',
  },
  signUpButton: {
    marginLeft: '$spacingSm',
    flexDirection: 'row',
  },
  signUpButtonLabel: {
    color: '$red',
  },
  loading: {
    marginRight: '$spacingSm',
  },
  loginInput: {
    marginBottom: '$spacingXs',
    color: '$dark',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: 8,
    paddingHorizontal: '$spacingSm',
  },
})

export default Login
