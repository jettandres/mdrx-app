import React from 'react'
import { View, TextInput, Text } from 'react-native'

import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

import type { FC } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  register?: UseFormRegisterReturn
  error?: FieldError
  title: string
  placeholder?: string
}

const HorizontalInput: FC<Props> = (props) => {
  const { title, placeholder } = props
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <TextInput style={styles.textInput} placeholder={placeholder} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    width: '45%',
  },
})

export default HorizontalInput
