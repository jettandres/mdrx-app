import React from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

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
  suggestions?: {
    list: Array<string>
    onSuggestionPress: (selected: string, index: number) => void
    suggestionsLoading: boolean
  }
}

const HorizontalInput: FC<Props> = (props) => {
  const {
    title,
    placeholder,
    control,
    name,
    error,
    keyboardType,
    suggestions,
  } = props
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  })

  const textInputStyle = error ? styles.textInputError : styles.textInput
  const hasSuggestions = suggestions && suggestions?.list.length > 0
  const loadingSuggestions = suggestions && suggestions?.suggestionsLoading

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
          placeholderTextColor="#D0D0D0"
        />
      </View>
      {error && <Text style={styles.errorLabel}>{error.message}</Text>}
      {hasSuggestions && (
        <View style={styles.suggestionsContainer}>
          {suggestions?.list.map((s, index) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => suggestions?.onSuggestionPress(s, index)}
              key={index}>
              <Text style={styles.suggestionItemLabel}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {loadingSuggestions && (
        <View style={styles.suggestionsContainer}>
          <ActivityIndicator
            style={styles.suggestionsLoading}
            animating
            color="#007aff"
          />
        </View>
      )}
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
    color: '$dark',
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
  suggestionsContainer: {
    position: 'absolute',
    width: '45%',
    right: 0,
    top: 50,
    elevation: 3,
    backgroundColor: '$white',
  },
  suggestionItem: {
    padding: '$spacingSm',
  },
  suggestionItemLabel: {
    color: '$dark',
  },
  suggestionsLoading: {
    padding: '$spacingSm',
    alignSelf: 'center',
    height: 50,
  },
})

export default HorizontalInput
