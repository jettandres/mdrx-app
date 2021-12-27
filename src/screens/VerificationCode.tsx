import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

import mdrxLogo from '@images/mdrx-logo.png'

import { RootStackParamList } from '@routes/types'

import { Auth } from 'aws-amplify'
import LoadingScreen from '@components/common/LoadingScreen'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import VerticalInput from '@components/VerticalInput'

type VerificationCodeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VerificationCode'
>
type VerificationCodeRouteProp = RouteProp<
  RootStackParamList,
  'VerificationCode'
>

type Props = {
  navigation: VerificationCodeNavigationProp
  route: VerificationCodeRouteProp
}

type FormData = {
  verificationCode: string
}

const schema = z.object({
  verificationCode: z.string().nonempty('should not be empty'),
})

const VerificationCode: FC<Props> = (props) => {
  const { route, navigation } = props
  const [error, setError] = useState<string | undefined>()

  const {
    params: { email, source },
  } = route

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const onConfirmVerificationCode = useCallback(
    (value: unknown) => {
      setError(undefined)
      setLoading(false)

      if (value === 'SUCCESS') {
        Alert.alert(
          'Email verification successful',
          `Please ${source === 'Login' ? 're' : ''}login with your account`,
          [
            {
              text: 'Login',
              onPress: () => navigation.navigate('Login'),
            },
          ],
        )
        navigation.navigate('Login')
      }
    },
    [navigation, source],
  )

  const onRejectVerificationCode = useCallback((reason: unknown) => {
    console.log('verificatoin code failed', reason)
    setError('Invalid verification code provided. Please try again.')
    setLoading(false)
  }, [])

  const onSubmitButtonPress = useCallback(
    (formData: FormData) => {
      try {
        setLoading(true)
        Auth.confirmSignUp(email, formData.verificationCode).then(
          onConfirmVerificationCode,
          onRejectVerificationCode,
        )
      } catch (e) {
        setLoading(false)
        reset()
      }
    },
    [email, onConfirmVerificationCode, onRejectVerificationCode, reset],
  )

  const onResendCodePress = useCallback(async () => {
    reset()
    try {
      await Auth.resendSignUp(email)
      Alert.alert(
        'Verification Code',
        `A new verification code has been sent to your registered email. Please check ${email}`,
      )
    } catch (e) {
      Alert.alert(
        'Verification Code Error',
        'Resend limit exceeded. Please try again after sometime.',
      )
    }
  }, [email, reset])

  if (loading) {
    return <LoadingScreen message="Submitting" />
  }

  return (
    <View style={styles.container}>
      <Image source={mdrxLogo} style={styles.logo} />
      <Text style={styles.titleLabel}>
        A verification code has been sent to your registered email address.
        Please also contact MDRx Admin for your Fund Allocation, Area, and
        Custodian Assignment.
      </Text>
      <View style={styles.textInputContainer}>
        <VerticalInput
          title="Verification Code"
          placeholder="XXXXXX"
          control={control}
          keyboardType="number-pad"
          name="verificationCode"
          error={errors.verificationCode}
        />
        {!!error && <Text style={styles.errorLabel}>{error}</Text>}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSubmit(onSubmitButtonPress)}>
          <Text style={styles.submitButtonLabel}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onResendCodePress}>
          <Text style={styles.resendCodeLabel}>RESEND CODE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    fontWeight: '400',
  },
  divider: {
    height: '$spacingLg',
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
  errorLabel: {
    color: '$red',
  },
  submitButtonLabel: {
    color: '$blue',
  },
  resendCodeLabel: {
    color: '$red',
    marginLeft: '$spacingSm',
  },
  loginInput: {
    marginBottom: '$spacingXs',
    color: '$dark',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: 8,
    paddingHorizontal: '$spacingSm',
  },
  successMessage: {
    marginTop: '$spacingMd',
  },
  loginButton: {
    marginTop: '$spacingLg',
    alignSelf: 'center',
  },
})

export default VerificationCode
