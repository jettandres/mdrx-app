import React, { useCallback } from 'react'
import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/native'

import HorizontalLabel from '@components/HorizontalLabel'
import FormFooter from '@components/FormFooter'
import HorizontalSwitch from '@components/HorizontalSwitch'
import ExpensePicker from '@components/ExpensePicker'
import HorizontalInput from '@components/HorizontalInput'

import uploadIcon from '@images/outline_add_a_photo_black_24dp.png'

import { currentDate } from '@utils/date'

type ExpensesReportFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExpensesReportForm'
>
type ExpensesReportFormRouteProp = RouteProp<
  RootStackParamList,
  'ExpensesReportForm'
>

type Props = {
  navigation: ExpensesReportFormNavigationProp
  route: ExpensesReportFormRouteProp
}

const ExpensesReportForm: FC<Props> = (props) => {
  const { navigation } = props

  const onNextPress = useCallback(() => {}, [])

  const onReviewPress = useCallback(
    () => navigation.navigate('ReviewExpenseReport'),
    [navigation],
  )

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.reportLabelContainer}>
            <HorizontalLabel bold title="Report #" subtitle="12432" />
          </View>
          <HorizontalLabel title="Date Reported" subtitle={currentDate} />
          <HorizontalLabel
            title="Assignment"
            subtitle="Mindanao Sales & Marketing"
          />
          <HorizontalSwitch title="VATable" />
          <HorizontalLabel title="Receipt Series #" subtitle="12E2A1" />
          <ExpensePicker />
          <HorizontalInput title="Expense Amount" placeholder="P100.00" />
          <HorizontalInput title="Supplier TIN #" placeholder="32125242-0000" />
          <HorizontalInput title="Supplier Name" placeholder="HPG Securities" />
          <HorizontalInput
            title="Supplier Address"
            placeholder="2312 Ford St, Malate"
          />
          <HorizontalInput
            title="Supplier Street/Brgy"
            placeholder="Brgy. 250"
          />
          <HorizontalInput
            title="Supplier Bldg"
            placeholder="Waypark Garden Bldg"
          />
          <TouchableOpacity style={styles.uploadButton}>
            <>
              <Image style={styles.uploadIcon} source={uploadIcon} />
              <Text style={styles.uploadLabel}>Upload image</Text>
            </>
          </TouchableOpacity>
          <FormFooter onNext={onNextPress} onReview={onReviewPress} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = EStyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: '$spacingMd',
  },
  uploadIcon: {
    height: 30,
    width: 30,
  },
  uploadButton: {
    flex: 1,
    alignSelf: 'center',
    margin: '$spacingXl',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: '$sm',
    color: '$darkGray',
    marginTop: '$spacingXs',
  },
  reportLabelContainer: {
    marginBottom: '$spacingSm',
  },
})

export default ExpensesReportForm
