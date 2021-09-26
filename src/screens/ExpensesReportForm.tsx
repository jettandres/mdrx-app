import React, { useCallback, useEffect } from 'react'
import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type { Dinero } from 'dinero.js'

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

import { useReactiveVar } from '@apollo/client'
import {
  employeeInfo,
  viewedExpenseReport,
} from '@app/apollo/reactiveVariables'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as faker from 'faker'

import dineroFromFloat from '@utils/dineroFromFloat'
import { PHP } from '@dinero.js/currencies'

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

type FormData = {
  id: string
  reportNumber: string
  expenseAmount: Dinero<number>
  supplierTin: string
  supplierName: string
  supplierAddress: string
  supplierStreetBrgy: string
  supplierBuilding: string
  isVatable: boolean
  expense: string
  receiptSeriesNo: string
  imagePath: string
}

const schema = z.object({
  id: z.string(),
  reportNumber: z.string(),
  expenseAmount: z
    .string()
    .min(1, { message: 'should not be empty' })
    .regex(/^[0-9|.]*$/, 'should not contain special characters')
    .transform((v) => parseFloat(v))
    .transform((f) => dineroFromFloat({ amount: f, currency: PHP, scale: 2 })),
  supplierTin: z.string().nonempty('should not be empty'),
  supplierName: z.string().nonempty('should not be empty'),
  supplierAddress: z.string(),
  supplierStreetBrgy: z.string(),
  supplierBuilding: z.string(),
  isVatable: z.boolean(),
  expense: z
    .object({
      id: z.string(),
      name: z.string(),
      birClass: z.string().optional(),
      vatable: z.boolean(),
    })
    .transform((o) => o.id),
  receiptSeriesNo: z.string(),
  imagePath: z.string(),
})

const ExpensesReportForm: FC<Props> = (props) => {
  const { navigation, route } = props
  const employeeData = useReactiveVar(employeeInfo)
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful, submitCount },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: route.params.id,
      reportNumber: route.params.reportNumber,
      isVatable: true,
      receiptSeriesNo: faker.datatype.uuid(),
    },
  })

  const imagePath = route.params?.imagePath
  useEffect(() => {
    if (imagePath) {
      setValue('imagePath', imagePath)
    }
  }, [imagePath, setValue])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      setValue('receiptSeriesNo', faker.datatype.uuid())
      console.log('form reset!')
    } else {
      console.log(errors)
    }
  }, [isSubmitSuccessful, reset, submitCount, errors, setValue])

  const onNextPress = useCallback((data) => {
    //console.log(toUnit(data.expenseAmount))
    console.log(data)
  }, [])

  const onReviewPress = useCallback(
    () => navigation.navigate('ReviewExpenseReport'),
    [navigation],
  )

  const onUploadButtonPress = useCallback(() => {
    viewedExpenseReport({
      id: route.params.id,
      reportNumber: route.params.reportNumber,
    })
    navigation.navigate('CapturePhoto')
  }, [navigation, route.params.id, route.params.reportNumber])

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.reportLabelContainer}>
            <HorizontalLabel
              bold
              title="Report #"
              subtitle={route.params.reportNumber}
            />
          </View>
          <HorizontalLabel title="Date Reported" subtitle={currentDate} />
          <HorizontalLabel
            title="Assignment"
            subtitle={employeeData?.custodianAssignment ?? ''}
          />
          <HorizontalLabel
            title="Receipt Series #"
            subtitle={watch('receiptSeriesNo').split('-')[4]}
          />
          <ExpensePicker name="expense" control={control} />
          <HorizontalSwitch
            title="VATable"
            name="isVatable"
            control={control}
          />
          <HorizontalInput
            title="Expense Amount"
            placeholder="P100.00"
            name="expenseAmount"
            control={control}
            error={errors.expenseAmount}
            keyboardType="number-pad"
          />
          <HorizontalInput
            title="Supplier TIN #"
            placeholder="32125242-0000"
            name="supplierTin"
            control={control}
            error={errors.supplierTin}
            keyboardType="number-pad"
          />
          <HorizontalInput
            title="Supplier Name"
            placeholder="HPG Securities"
            name="supplierName"
            control={control}
            error={errors.supplierName}
          />
          <HorizontalInput
            title="Supplier Address"
            placeholder="2312 Ford St, Malate"
            name="supplierAddress"
            control={control}
            error={errors.supplierAddress}
          />
          <HorizontalInput
            title="Supplier Street/Brgy"
            placeholder="Brgy. 250"
            name="supplierStreetBrgy"
            control={control}
            error={errors.supplierStreetBrgy}
          />
          <HorizontalInput
            title="Supplier Bldg"
            placeholder="Waypark Garden Bldg"
            name="supplierBuilding"
            control={control}
            error={errors.supplierBuilding}
          />
          <TouchableOpacity
            onPress={onUploadButtonPress}
            style={styles.uploadButton}>
            <>
              <Image style={styles.uploadIcon} source={uploadIcon} />
              <Text style={styles.uploadLabel}>Upload image</Text>
            </>
          </TouchableOpacity>
          <FormFooter
            onNext={handleSubmit(onNextPress)}
            onReview={onReviewPress}
          />
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
