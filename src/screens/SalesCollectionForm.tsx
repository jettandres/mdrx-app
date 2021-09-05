import React from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native'

import type { FC } from 'react'
import type { RootStackParamList } from '@routes/types'

import EStyleSheet from 'react-native-extended-stylesheet'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import HorizontalInput from '@components/HorizontalInput'

import uploadIcon from '@images/outline_add_a_photo_black_24dp.png'

type SalesCollectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SalesCollectionForm'
>
type SalesCollectionRouteProp = RouteProp<
  RootStackParamList,
  'SalesCollectionForm'
>

type Props = {
  navigation: SalesCollectionNavigationProp
  route: SalesCollectionRouteProp
}

const SalesCollectionForm: FC<Props> = (props) => {
  const { route } = props
  const isSalesInvoice = route.params.collectionType === 'sales-invoice'
  return (
    <View style={styles.container}>
      {isSalesInvoice && (
        <HorizontalInput
          title="Collection Receipt #"
          placeholder="2312-2456-6431"
        />
      )}
      <TouchableOpacity style={styles.uploadIconButton}>
        <Image source={uploadIcon} style={styles.uploadIcon} />
        <Text>Upload Deposit Slip</Text>
      </TouchableOpacity>
      <View style={styles.submitButton}>
        <Button title="Submit" onPress={() => {}} />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: '$spacingSm',
    backgroundColor: '$white',
  },
  uploadIcon: {
    height: 30,
    width: 30,
    marginBottom: '$spacingXs',
  },
  uploadIconButton: {
    marginVertical: '$spacingMd',
    alignSelf: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
  },
})

export default SalesCollectionForm
