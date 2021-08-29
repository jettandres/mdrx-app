import React, { useCallback } from 'react'
import { View, Text, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import HorizontalInput from '@components/HorizontalInput'
import SalesDocumentPicker from '@components/SalesDocumentPicker'

import CustomerPicker from '@components/CustomerPicker'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

import { currentDate } from '@utils/date'

import SalesInvoiceStatusPicker from '@components/SalesInvoiceStatusPicker'
import ProductClassPicker from '@components/ProductClassPicker'
import FormFooter from '@components/FormFooter'
import { Calendar } from 'react-native-calendars'
import HorizontalDatePicker from '@components/HorizontalDatePicker'

type SalesReportFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SalesReportForm'
>
type SalesReportFormRouteProp = RouteProp<RootStackParamList, 'SalesReportForm'>

type Props = {
  navigation: SalesReportFormNavigationProp
  route: SalesReportFormRouteProp
}

const SalesReportForm: FC<Props> = (props) => {
  const { navigation } = props

  const onNextPress = useCallback(() => {}, [])

  const onReviewPress = useCallback(
    () => navigation.navigate('ReviewSalesReport'),
    [navigation],
  )

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.reportLabelContainer}>
            <HorizontalLabel bold title="TPR #" subtitle="Min07021" />
          </View>
          <HorizontalLabel title="Date Reported" subtitle={currentDate} />
          <HorizontalLabel
            title="Assignment"
            subtitle="Mindanao Sales & Marketing"
          />
          <CustomerPicker />
          <View style={styles.divider} />
          <View style={styles.seriesNoLabelContainer}>
            <HorizontalLabel title="Sales Invoice Series #" subtitle="503" />
          </View>
          <HorizontalDatePicker title="Collection Date" />
          <SalesDocumentPicker />
          <SalesInvoiceStatusPicker />
          <View style={styles.divider} />
          <ProductClassPicker />
          <HorizontalInput title="Product Code" placeholder="373727" />
          <View style={styles.productDescriptionLabelContainer}>
            <HorizontalLabel
              title="Product Description"
              subtitle="BVI Xstar Slit Knife 2.75"
            />
          </View>
          <HorizontalInput title="Total Price" placeholder="P12,000.00" />
          <HorizontalInput title="Total Boxes Sold" placeholder="2" />
          <HorizontalInput title="Total Pcs Sold" placeholder="0" />
          <View style={styles.totalSoldLabelContainer}>
            <HorizontalLabel bold title="Total Sold" subtitle="20" />
            <HorizontalLabel
              title="Selling Price Evaluation"
              subtitle="Unacceptable"
            />
          </View>
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
    backgroundColor: '$white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '$spacingLg',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: '$spacingMd',
  },
  reportLabelContainer: {
    marginBottom: '$spacingSm',
  },
  divider: {
    marginVertical: '$spacingMd',
    width: '100%',
    height: 1,
    backgroundColor: '$borderColor',
  },
  totalSoldLabelContainer: {
    marginTop: '$spacingXl',
    marginBottom: '$spacingXl',
  },
  seriesNoLabelContainer: {
    marginVertical: '$spacingSm',
  },
  productDescriptionLabelContainer: {
    marginTop: '$spacingMd',
    paddingRight: '$spacingSm',
    marginBottom: '$spacingXl',
  },
})

export default SalesReportForm
