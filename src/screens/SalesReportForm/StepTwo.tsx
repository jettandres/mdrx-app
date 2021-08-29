import React, { useCallback } from 'react'
import { View, ScrollView, BackHandler } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import HorizontalInput from '@components/HorizontalInput'
import SalesDocumentPicker from '@components/SalesDocumentPicker'

import SalesInvoiceStatusPicker from '@components/SalesInvoiceStatusPicker'
import ProductClassPicker from '@components/ProductClassPicker'
import FormFooter from '@components/FormFooter'
import HorizontalDatePicker from '@components/HorizontalDatePicker'
import { useFocusEffect } from '@react-navigation/native'

type Props = {
  onNext: () => void
  onReview: () => void
  onBack: () => boolean | null | undefined
}

const StepTwo: FC<Props> = (props) => {
  const { onNext, onReview, onBack } = props

  const customBackPress = useCallback(() => {
    const onBackPress = () => {
      onBack()
      return true
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [onBack])

  useFocusEffect(customBackPress)

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
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
          <FormFooter onNext={onNext} onReview={onReview} />
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

export default StepTwo
