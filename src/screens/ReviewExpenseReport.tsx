import React, { useCallback, useState } from 'react'
import { View, SectionList, Alert } from 'react-native'
import { useAsync } from 'react-async-hook'
import EStyleSheet from 'react-native-extended-stylesheet'
import { dinero, DineroSnapshot, subtract, toUnit, toSnapshot } from 'dinero.js'

import type { FC } from 'react'

import SectionHeader from '@components/ReviewReport/Expenses/SectionHeader'
import ListHeaderComponent from '@components/ReviewReport/Expenses/ListHeaderComponent'
import ListFooterComponent from '@components/ReviewReport/Expenses/ListFooterComponent'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import type { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import computeExpenseReport, {
  ReportFooter,
} from '@app/services/computeExpenseReport'
import formatCurrency from '@utils/formatCurrency'

import { useMutation, useReactiveVar } from '@apollo/client'
import {
  DeleteReceiptPayload,
  DeleteReceiptResponse,
  DELETE_RECEIPT,
} from '@app/apollo/gql/receipts'
import { employeeInfo } from '@app/apollo/reactiveVariables'

import SectionFooter from '@components/ReviewReport/Expenses/SectionFooter'
import ListItem from '@components/ReviewReport/Expenses/ListItem'
import EmployeeFunds from '@app/types/EmployeeFunds'
import Employee from '@app/types/Employee'
import {
  MUTATION_SUBMIT_EXPENSE_REPORT,
  QUERY_EXPENSE_REPORTS,
  SubmitExpenseReportPayload,
  SubmitExpenseReportResponse,
} from '@app/apollo/gql/expense'
import LoadingScreen from '@components/common/LoadingScreen'

type ReviewExpenseReportNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ReviewExpenseReport'
>

type ReviewExpenseReportRouteProp = RouteProp<
  RootStackParamList,
  'ReviewExpenseReport'
>

type Props = {
  navigation: ReviewExpenseReportNavigationProp
  route: ReviewExpenseReportRouteProp
}

type DineroFunds = {
  revolvingFundAmount: DineroSnapshot<number>
  replenishableAmount: DineroSnapshot<number>
  unusedAmount: DineroSnapshot<number>
}

const defaultFunds: EmployeeFunds = {
  revolvingFundAmount: 'P0.00',
  replenishableAmount: 'P0.00',
  unusedAmount: 'P0.00',
}

const ReviewReport: FC<Props> = (props) => {
  const [collapsedHeaders, setCollapsedHeaders] = useState<Array<string>>([])
  const [funds, setFunds] = useState<EmployeeFunds | undefined>()
  const [dineroFunds, setDineroFunds] = useState<DineroFunds | undefined>()

  const { route, navigation } = props
  const expenseReportId = route.params.expenseReportId
  const employeeData = useReactiveVar(employeeInfo) as Employee

  const [deleteReceipt, { data: deleteResponse }] = useMutation<
    DeleteReceiptResponse,
    DeleteReceiptPayload
  >(DELETE_RECEIPT)

  const [submitReport, { loading: submitReportLoading }] = useMutation<
    SubmitExpenseReportResponse,
    SubmitExpenseReportPayload
  >(MUTATION_SUBMIT_EXPENSE_REPORT)

  const asyncReport = useAsync(
    () => computeExpenseReport(expenseReportId),
    [expenseReportId, deleteResponse],
  )

  const onSectionHeaderPress = useCallback((sectionTitle: string) => {
    setCollapsedHeaders((collapsedList) => {
      const alreadyCollapsed = collapsedList.find((v) => v === sectionTitle)
      if (alreadyCollapsed) {
        return collapsedList.filter((v) => v !== sectionTitle)
      }

      return [...collapsedList, sectionTitle]
    })
  }, [])

  const onDeletePress = useCallback(
    async (receiptId: string) => {
      await deleteReceipt({
        variables: {
          receiptId,
        },
      })
    },
    [deleteReceipt],
  )

  const onViewPhoto = useCallback(
    (imageKey: string) => {
      navigation.navigate('ViewPhoto', { imageKey })
    },
    [navigation],
  )

  const onSubmitReport = useCallback(async () => {
    if (dineroFunds) {
      try {
        await submitReport({
          variables: {
            expenseReportId,
            revAmount: dineroFunds.revolvingFundAmount,
            replAmount: dineroFunds.replenishableAmount,
            unusedAmount: dineroFunds.unusedAmount,
          },
          refetchQueries: [
            {
              query: QUERY_EXPENSE_REPORTS,
              variables: {
                employeeId: employeeData?.id,
              },
            },
          ],
        })

        Alert.alert(
          'Report Submitted',
          'Your expense report has been recorded',
          [{ text: 'Ok', onPress: () => navigation.navigate('HomeDrawer') }],
        )
      } catch (e) {
        Alert.alert(
          'Submission failed',
          `Please check your internet connection and try again.${JSON.stringify(
            e,
          )}`,
        )
      }
    }
  }, [dineroFunds, employeeData?.id, expenseReportId, navigation, submitReport])

  if (asyncReport.loading && !asyncReport.result) {
    return <LoadingScreen message="Loading Report" />
  }

  if (submitReportLoading) {
    return <LoadingScreen message="Submitting Report" />
  }

  const data = asyncReport.result?.reportBody ?? []
  const createdAt = asyncReport.result?.reportHeader.createdAt as string

  const reportFooter = asyncReport.result?.reportFooter as ReportFooter

  if (employeeData.funds && !funds && !dineroFunds) {
    const revAmount = dinero(employeeData.funds)
    const replAmount = dinero(reportFooter.totalReplenishable.grossAmount)
    const unusedAmount = subtract(revAmount, replAmount)

    setFunds({
      revolvingFundAmount: formatCurrency(revAmount),
      replenishableAmount: `-${formatCurrency(replAmount)}`,
      unusedAmount: formatCurrency(unusedAmount),
    })

    setDineroFunds({
      revolvingFundAmount: toSnapshot(revAmount),
      replenishableAmount: toSnapshot(replAmount),
      unusedAmount: toSnapshot(unusedAmount),
    })
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ListHeaderComponent
            reportCreatedAt={createdAt}
            funds={funds ?? defaultFunds}
          />
        }
        renderSectionHeader={({ section: { title } }) => {
          const isCollapsed = collapsedHeaders.find((t) => t === title.label)
          return (
            <SectionHeader
              onPress={onSectionHeaderPress}
              title={title.label}
              itemCount={title.itemCount}
              isCollapsed={!!isCollapsed}
            />
          )
        }}
        renderItem={({ item, section }) => {
          const isCollapsed = collapsedHeaders.find(
            (t) => t === section.title.label,
          )
          if (isCollapsed) {
            return null
          }
          return (
            <ListItem
              {...item}
              onViewPhoto={onViewPhoto}
              onDeletePress={onDeletePress}
              reviewOnly={route.params.reviewOnly}
            />
          )
        }}
        renderSectionFooter={({ section: { title } }) => {
          const isCollapsed = collapsedHeaders.find((t) => t === title.label)
          return (
            <SectionFooter
              netAmount={formatCurrency(dinero(title.total.netAmount))}
              vatAmount={toUnit(dinero(title.total.vatAmount)).toFixed(2)}
              grossAmount={formatCurrency(dinero(title.total.grossAmount))}
              isCollapsed={!!isCollapsed}
            />
          )
        }}
        ListFooterComponent={
          <ListFooterComponent
            reportFooter={reportFooter}
            onSubmit={onSubmitReport}
            reviewOnly={route.params.reviewOnly}
          />
        }
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '$darkGray',
  },
  listFooterTitle: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '$spacingMd',
    marginBottom: '$spacingMd',
  },
  listFooterTotalYearContainer: {
    marginTop: '$spacingSm',
  },
})

export default ReviewReport
