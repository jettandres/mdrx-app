import React, { useState, useEffect, useCallback } from 'react'
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
  secureTextEntry?: boolean
}

const VerticalInput: FC<Props> = (props) => {
  const {
    title,
    placeholder,
    control,
    name,
    error,
    keyboardType,
    suggestions,
    secureTextEntry,
  } = props
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  })

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [hasPickedSuggestion, setHasPickedSuggestion] = useState<boolean>(false)

  const textInputStyle = error ? styles.textInputError : styles.textInput
  const hasSuggestions = suggestions && suggestions?.list.length > 0
  const loadingSuggestions = suggestions && suggestions?.suggestionsLoading

  const onSuggestionPick = useCallback(
    (selected: string, index: number) => {
      suggestions?.onSuggestionPress(selected, index)
    },
    [suggestions],
  )

  useEffect(() => {
    if (suggestions) {
      const val = field.value as string
      const hasSelected = !!val && suggestions.list.includes(val, 0)
      setHasPickedSuggestion(hasSelected)
    }
  }, [field.value, suggestions])

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          value={field.value}
          onChangeText={field.onChange}
          style={textInputStyle}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#D0D0D0"
          onFocus={() => setIsFocused(true)}
        />
      </View>
      {error && <Text style={styles.errorLabel}>{error.message}</Text>}
      {isFocused && hasSuggestions && !hasPickedSuggestion && (
        <View style={styles.suggestionsContainer}>
          {suggestions?.list.map((s, index) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => onSuggestionPick(s, index)}
              key={index}>
              <Text style={styles.suggestionItemLabel}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {isFocused && loadingSuggestions && !hasPickedSuggestion && (
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInput: {
    color: '$dark',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: 8,
    paddingHorizontal: '$spacingSm',
    width: '100%',
  },
  textInputError: {
    color: '$dark',
    borderWidth: 1,
    borderColor: '$red',
    borderRadius: 8,
    paddingHorizontal: '$spacingSm',
    width: '100%',
  },
  errorLabel: {
    alignSelf: 'flex-start',
    color: '$red',
  },
  suggestionsContainer: {
    position: 'absolute',
    width: '45%',
    right: 0,
    top: 50,
    zIndex: 1,
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
  title: {
    fontSize: '$xs',
  },
})

export default VerticalInput
