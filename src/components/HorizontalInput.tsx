import React from 'react'
import { View, TextInput, Text } from 'react-native'

import type { FC } from 'react'
import type { KeyboardTypeOptions } from 'react-native'
import { Control, FieldError, useController } from 'react-hook-form'

import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  title: string
  placeholder?: string
  name: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  error?: FieldError
  keyboardType?: KeyboardTypeOptions
}

const HorizontalInput: FC<Props> = (props) => {
  const { title, placeholder, control, name, error, keyboardType } = props
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  })

  const textInputStyle = error ? styles.textInputError : styles.textInput

  return (
    <View>
      <View style={styles.container}>
        <Text>{title}</Text>
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          style={textInputStyle}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text style={styles.errorLabel}>{error.message}</Text>}
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
  textInputError: {
    borderBottomWidth: 1,
    borderColor: '$red',
    width: '45%',
  },
  errorLabel: {
    alignSelf: 'flex-end',
    color: '$red',
  },
})

export default HorizontalInput
