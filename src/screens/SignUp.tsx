import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

import mdrxLogo from '@images/mdrx_logo.png'

import { RootStackParamList } from '@routes/types'

import { Auth } from 'aws-amplify'
import LoadingScreen from '@components/common/LoadingScreen'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import VerticalInput from '@components/VerticalInput'

type SignUpNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>
type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>

type Props = {
  navigation: SignUpNavigationProp
  route: SignUpRouteProp
}

type FormData = {
  name: string
  contactNumber: string
  email: string
  password: string
  confirmPassword: string
}

const passwordMessage =
  'Password should be min 8 letter password, with at least a symbol, upper and lower case letters and a number'

const schema = z.object({
  name: z.string().nonempty('should not be empty'),
  contactNumber: z
    .string()
    .nonempty('should not be empty')
    .length(
      11,
      'Invalid number format. Please follow 09XX-XXX-XXXX without the dash',
    )
    .transform((n) => '+63' + n.substring(1)),
  email: z
    .string()
    .nonempty('should not be empty')
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Not a valid email',
    ),
  password: z
    .string()
    .nonempty('should not be empty')
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      passwordMessage,
    ),
  confirmPassword: z
    .string()
    .nonempty('should not be empty')
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      passwordMessage,
    ),
})

const SignUp: FC<Props> = (props) => {
  const { navigation } = props

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const [errorLabel, setErrorLabel] = useState<string | null>()
  const [loading, setLoading] = useState(false)

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  useEffect(() => {
    if (!!password && !!confirmPassword) {
      if (password !== confirmPassword) {
        setErrorLabel('Passwords do not match')
      } else {
        setErrorLabel(null)
      }
    }
  }, [password, confirmPassword])

  const onSubmitButtonPress = useCallback(
    async (formData: FormData) => {
      try {
        setLoading(true)
        const resp = await Auth.signUp({
          username: formData.email,
          password: formData.password,
          attributes: {
            email: formData.email,
            name: formData.name,
            phone_number: formData.contactNumber,
          },
        })

        console.log('signup', resp)
        setLoading(false)

        navigation.navigate('VerificationCode', {
          email: formData.email,
          password: formData.password,
          source: 'SignUp',
        })
      } catch (e) {
        setLoading(false)
        if (e?.name === 'UsernameExistsException') {
          setErrorLabel(
            'Email is already registered. Please login or contact admin for assistance.',
          )
        } else {
          setErrorLabel(
            `Signup error. Please contact admin for the ff: ${JSON.stringify(
              e,
            )}`,
          )
        }
      }
    },
    [navigation],
  )

  if (loading) {
    return <LoadingScreen message="Submitting" />
  }

  return (
    <View style={styles.container}>
      <Image source={mdrxLogo} style={styles.logo} />
      <Text style={styles.titleLabel}>SIGN UP TO MDRX</Text>
      <View style={styles.textInputContainer}>
        <VerticalInput
          title="Name"
          placeholder="Full Name"
          control={control}
          name="name"
          error={errors.name}
        />
        <View style={styles.divider} />
        <VerticalInput
          title="Contact Number"
          placeholder="0906123456"
          keyboardType="phone-pad"
          control={control}
          name="contactNumber"
          error={errors.contactNumber}
        />
        <VerticalInput
          title="Email"
          placeholder="employee@mdrx.net"
          control={control}
          name="email"
          error={errors.email}
        />
        <View style={styles.divider} />
        <VerticalInput
          title="Password"
          secureTextEntry
          control={control}
          name="password"
          error={errors.password}
        />
        <VerticalInput
          title="Confirm Password"
          secureTextEntry
          control={control}
          name="confirmPassword"
          error={errors.confirmPassword}
        />
        {!!errorLabel && <Text style={styles.errorLabel}>{errorLabel}</Text>}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          disabled={!!errorLabel}
          onPress={handleSubmit(onSubmitButtonPress)}>
          <Text style={styles.submitButtonLabel}>SUBMIT</Text>
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

export default SignUp
