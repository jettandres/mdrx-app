import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { dinero, Dinero, toSnapshot } from 'dinero.js'
import { Storage } from 'aws-amplify'

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
import useDebounce from '@utils/hooks/useDebounce'

import { useReactiveVar, useMutation, useLazyQuery } from '@apollo/client'
import {
  employeeInfo,
  viewedExpenseReport,
} from '@app/apollo/reactiveVariables'

import { FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as faker from 'faker'

import dineroFromFloat from '@utils/dineroFromFloat'
import { PHP } from '@dinero.js/currencies'
import {
  NewExpenseReceiptPayload,
  NewExpenseReceiptResponse,
  MUTATION_NEW_EXPENSE_RECEIPT,
  NewKmReadingResponse,
  NewKmReadingPayload,
  MUTATION_NEW_KM_READING,
  DeleteExpenseReportResponse,
  DeleteExpenseReportPayload,
  MUTATION_DELETE_EXPENSE_REPORT,
  QUERY_EXPENSE_REPORTS,
} from '@app/apollo/gql/expense'
import Expense from '@app/types/Expense'
import DeleteButton from '@components/common/DeleteButton'
import LoadingScreen from '@components/common/LoadingScreen'
import {
  MUTATION_UPDATE_RECEIPT_IMAGE_KEY,
  QueryReceiptSuppliersPayload,
  QueryReceiptSuppliersResponse,
  QUERY_RECEIPT_SUPPLIERS,
  UpdateReceiptImageKeyPayload,
  UpdateReceiptImageKeyResponse,
} from '@app/apollo/gql/receipts'
import Supplier from '@app/types/Supplier'

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
  supplierTin?: string
  supplierName: string
  supplierAddress: string
  supplierStreetBrgy: string
  supplierBuilding: string
  isVatable: boolean
  expense: Expense
  receiptSeriesNo: string
  imagePath: string
  litersAdded?: number
  kmReading?: number
  vatAmount: Dinero<number>
  netAmount: Dinero<number>
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
  supplierTin: z.string().optional(),
  supplierName: z.string().nonempty('should not be empty'),
  supplierAddress: z.string().optional(),
  supplierStreetBrgy: z.string().optional(),
  supplierBuilding: z.string().optional(),
  isVatable: z.boolean(),
  expense: z.object({
    id: z.string(),
    name: z.string(),
    birClass: z.string().optional(),
  }),
  receiptSeriesNo: z.string(),
  imagePath: z.string(),
  litersAdded: z
    .string()
    .regex(/^[0-9|.]*$/, 'should not contain special characters')
    .transform((v) => parseFloat(v))
    .optional(),
  kmReading: z
    .string()
    .regex(/^[0-9|.]*$/, 'should not contain special characters')
    .transform((v) => parseFloat(v))
    .optional(),
})

const ExpensesReportForm: FC<Props> = (props) => {
  const { navigation, route } = props
  const employeeData = useReactiveVar(employeeInfo)
  const expenseReportId = route.params.id
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState('0.0%')
  const [supplierSuggestions, setSupplierSuggestions] = useState<Array<string>>(
    [],
  )
  const [isSuggestionPressed, setIsSuggestionPressed] = useState(false)
  const [netAmount, setNetAmount] = useState<string>('0.00')
  const [vatAmount, setVatAmount] = useState<string>('0.00')

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
      id: expenseReportId,
      reportNumber: route.params.reportNumber,
      isVatable: true,
      receiptSeriesNo: faker.datatype.uuid(),
    },
  })

  const [insertExpenseReceipt, { data, loading: insertLoading, error }] =
    useMutation<NewExpenseReceiptResponse, NewExpenseReceiptPayload>(
      MUTATION_NEW_EXPENSE_RECEIPT,
    )

  const [insertKmReading] = useMutation<
    NewKmReadingResponse,
    NewKmReadingPayload
  >(MUTATION_NEW_KM_READING)

  const [updateReceiptImageKey] = useMutation<
    UpdateReceiptImageKeyResponse,
    UpdateReceiptImageKeyPayload
  >(MUTATION_UPDATE_RECEIPT_IMAGE_KEY)

  const [
    searchReceiptSuppliers,
    { data: searchSupplierData, loading: suggestionsLoading },
  ] = useLazyQuery<QueryReceiptSuppliersResponse, QueryReceiptSuppliersPayload>(
    QUERY_RECEIPT_SUPPLIERS,
  )

  const [deleteExpenseReport, { loading: deleteLoading }] = useMutation<
    DeleteExpenseReportResponse,
    DeleteExpenseReportPayload
  >(MUTATION_DELETE_EXPENSE_REPORT)

  const onDeleteExpenseReport = useCallback(() => {
    Alert.alert(
      'Delete expense report',
      'This will completely remove all recorded receipts from the database. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Report',
          style: 'default',
          onPress: async () => {
            const { data: deleteResponse } = await deleteExpenseReport({
              variables: { expenseReportId },
              refetchQueries: [
                {
                  query: QUERY_EXPENSE_REPORTS,
                  variables: {
                    employeeId: employeeData?.id ?? '',
                  },
                },
              ],
            })
            const isDeleted = !!deleteResponse?.expenseReport?.id
            console.log('deleted?', isDeleted)
            if (isDeleted) {
              navigation.navigate('HomeDrawer')
            }
          },
        },
      ],
    )
  }, [deleteExpenseReport, employeeData?.id, expenseReportId, navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DeleteButton onPress={onDeleteExpenseReport} />,
    })
  }, [navigation, onDeleteExpenseReport])

  const imagePath = route.params?.imagePath

  useEffect(() => {
    if (imagePath) {
      setValue('imagePath', imagePath)
    }
  }, [imagePath, setValue])

  useEffect(() => {
    if (isSubmitSuccessful && data && !insertLoading) {
      reset()
      setValue('receiptSeriesNo', faker.datatype.uuid())
      navigation.setParams({ imagePath: undefined })
      console.log('form reset!')
      setUploadLoading(false)
    } else if (error) {
      console.log('errors', error)
    }
  }, [
    isSubmitSuccessful,
    reset,
    submitCount,
    errors,
    setValue,
    data,
    error,
    insertLoading,
    navigation,
  ])

  const debouncedTin = useDebounce(watch('supplierTin'), 250)

  useEffect(() => {
    const hasLength = debouncedTin && (debouncedTin as string).length > 0
    if (hasLength) {
      searchReceiptSuppliers({
        variables: {
          tin: debouncedTin as string,
          limit: 3,
        },
      })
    } else {
      setSupplierSuggestions([])
    }
  }, [debouncedTin, searchReceiptSuppliers])

  useEffect(() => {
    if (searchSupplierData) {
      const { results } = searchSupplierData
      const supplierTins = results.map((r) => r.supplier.tin)
      setSupplierSuggestions(supplierTins)
    }
  }, [searchSupplierData])

  const isGas = watch('expense')?.name === 'Gas'

  const onNextPress = useCallback(
    async (formData: FormData) => {
      const net = formData.isVatable
        ? toSnapshot(
            dineroFromFloat({
              amount: parseFloat(netAmount),
              currency: PHP,
              scale: 2,
            }),
          )
        : toSnapshot(formData.expenseAmount)

      const vat = formData.isVatable
        ? toSnapshot(
            dineroFromFloat({
              amount: parseFloat(vatAmount),
              currency: PHP,
              scale: 2,
            }),
          )
        : toSnapshot(dinero({ amount: 0, currency: PHP, scale: 2 }))

      const payload: NewExpenseReceiptPayload = {
        receipt: {
          amount: toSnapshot(formData.expenseAmount),
          expense_id: formData.expense.id,
          expense_report_id: formData.id,
          supplier: {
            tin: formData.supplierTin,
            name: formData.supplierName,
            address: formData.supplierAddress,
            streetBrgy: formData.supplierStreetBrgy,
            bldg: formData.supplierBuilding,
          },
          vatable: formData.isVatable,
          net,
          vat,
        },
      }

      const { data: receiptData } = await insertExpenseReceipt({
        variables: payload,
      })

      if (receiptData) {
        const {
          data: { id: receiptId },
        } = receiptData

        if (isGas) {
          const kmPayload: NewKmReadingPayload = {
            kmReading: {
              expense_report_id: expenseReportId,
              receipt_id: receiptId,
              liters_added: formData.litersAdded as number,
              km_reading: formData.kmReading as number,
            },
          }

          await insertKmReading({ variables: kmPayload })
        }

        setUploadLoading(true)
        const respImg = await fetch(formData.imagePath)
        const blob = await respImg.blob()

        try {
          const res = await Storage.put(`${receiptId}.jpg`, blob, {
            contentType: 'image/jpeg',
            level: 'public',
            acl: 'public-read',
            progressCallback: ({ loaded, total }): void => {
              const perc = ((loaded / total) * 100).toFixed(1) + '%'
              setUploadPercentage(perc)
            },
          })

          await updateReceiptImageKey({
            variables: { receiptId, imageKey: `public/${res.key}` },
          })
        } catch (e) {
          console.log('upload failed', e)
          setUploadLoading(false)
        }
      }
    },
    [
      expenseReportId,
      insertExpenseReceipt,
      insertKmReading,
      isGas,
      netAmount,
      updateReceiptImageKey,
      vatAmount,
    ],
  )

  const onReviewPress = useCallback(
    () => navigation.navigate('ReviewExpenseReport', { expenseReportId }),
    [expenseReportId, navigation],
  )

  const onUploadButtonPress = useCallback(() => {
    viewedExpenseReport({
      id: route.params.id,
      reportNumber: route.params.reportNumber,
    })
    navigation.navigate('CapturePhoto')
  }, [navigation, route.params.id, route.params.reportNumber])

  useEffect(() => {
    if (searchSupplierData) {
      const { results } = searchSupplierData
      const selectedExisting = !!results
        .map((r) => r.supplier)
        .find((s) => s.tin === debouncedTin)
      setIsSuggestionPressed(selectedExisting)
    }
  }, [debouncedTin, searchSupplierData])

  const onSuggestionPress = useCallback(
    (_, index: number) => {
      if (searchSupplierData) {
        const { results } = searchSupplierData
        const supplier: Supplier = results[index].supplier
        const isVatable = results[index].vatable

        setValue('supplierTin', supplier.tin)
        setValue('supplierName', supplier.name)
        setValue('supplierBuilding', supplier.bldg ?? '')
        setValue('supplierAddress', supplier.address ?? '')
        setValue('supplierStreetBrgy', supplier.streetBrgy ?? '')
        setValue('isVatable', isVatable)
      }
    },
    [searchSupplierData, setValue],
  )

  const debouncedExpenseAmount = useDebounce(watch('expenseAmount'), 100)
  useEffect(() => {
    if (debouncedExpenseAmount) {
      const floatAmount = parseFloat(debouncedExpenseAmount)
      const tempNetAmount = floatAmount / 1.12
      const tempVatAmount = tempNetAmount * 0.12

      setNetAmount(tempNetAmount.toFixed(2))
      setVatAmount(tempVatAmount.toFixed(2))
    } else {
      setNetAmount('0.00')
      setVatAmount('0.00')
    }
  }, [debouncedExpenseAmount])

  if (deleteLoading || insertLoading) {
    const message = deleteLoading ? 'Deleting Report' : 'Adding Receipt'
    return <LoadingScreen message={message} />
  }

  if (uploadLoading) {
    const message = `Uploading image ${uploadPercentage}`
    return <LoadingScreen message={message} />
  }

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
          <ExpensePicker
            name="expense"
            error={errors.expense as FieldError}
            control={control}
          />
          {isGas && (
            <>
              <HorizontalInput
                title="Liters added"
                name="litersAdded"
                placeholder="15.0"
                control={control}
                keyboardType="number-pad"
                error={errors.litersAdded}
              />
              <HorizontalInput
                title="Current km reading"
                name="kmReading"
                placeholder="100"
                control={control}
                keyboardType="number-pad"
                error={errors.kmReading}
              />
            </>
          )}
          {!isSuggestionPressed && (
            <HorizontalSwitch
              title="Receipt VATable"
              name="isVatable"
              control={control}
            />
          )}
          {isSuggestionPressed && (
            <HorizontalLabel
              title="Receipt VATable"
              subtitle={watch('isVatable') ? 'VATable' : 'non-VATable'}
            />
          )}
          <HorizontalInput
            title="Expense Amount"
            placeholder="P100.00"
            name="expenseAmount"
            control={control}
            error={errors.expenseAmount as FieldError}
            keyboardType="number-pad"
          />
          {watch('isVatable') && (
            <View style={styles.vatAmountsContainer}>
              <HorizontalLabel title="Net Amount" subtitle={netAmount} />
              <HorizontalLabel title="VAT Amount" subtitle={vatAmount} />
            </View>
          )}
          <HorizontalInput
            title="Supplier TIN #"
            placeholder="32125242-0000"
            name="supplierTin"
            control={control}
            error={errors.supplierTin}
            keyboardType="number-pad"
            suggestions={{
              list: supplierSuggestions,
              onSuggestionPress,
              suggestionsLoading,
            }}
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
            {!imagePath && (
              <>
                <Image style={styles.uploadIcon} source={uploadIcon} />
                <Text style={styles.uploadLabel}>Upload image</Text>
                {!!errors.imagePath && (
                  <Text style={styles.errorLabel}>
                    Receipt photo is required
                  </Text>
                )}
              </>
            )}
            {!!imagePath && (
              <>
                <Image
                  style={styles.capturedImage}
                  source={{ uri: imagePath }}
                />
                <Text style={styles.uploadLabel}>Tap photo to retake</Text>
              </>
            )}
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
  errorLabel: {
    fontSize: '$sm',
    color: '$red',
    marginTop: '$spacingXs',
  },
  reportLabelContainer: {
    marginBottom: '$spacingSm',
  },
  capturedImage: {
    height: 200,
    width: 150,
  },
  vatAmountsContainer: {
    marginBottom: '$spacingSm',
  },
})

export default ExpensesReportForm
