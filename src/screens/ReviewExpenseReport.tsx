import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useAsync } from 'react-async-hook'
import EStyleSheet from 'react-native-extended-stylesheet'
import { dinero, toUnit } from 'dinero.js'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
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
import { useMutation } from '@apollo/client'
import {
  DeleteReceiptPayload,
  DeleteReceiptResponse,
  DELETE_RECEIPT,
} from '@app/apollo/gql/receipts'
import SectionFooter from '@components/ReviewReport/Expenses/SectionFooter'
import ListItem from '@components/ReviewReport/Expenses/ListItem'

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

const ReviewReport: FC<Props> = (props) => {
  const [collapsedHeaders, setCollapsedHeaders] = useState<Array<string>>([])
  const { route, navigation } = props
  const expenseReportId = route.params.expenseReportId

  const [deleteReceipt, { data: deleteResponse }] = useMutation<
    DeleteReceiptResponse,
    DeleteReceiptPayload
  >(DELETE_RECEIPT)

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

  const onSubmitReport = useCallback(() => {}, [])

  if (asyncReport.loading && !asyncReport.result) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating color="#007aff" />
        <Text style={styles.loadingLabel}>Loading Report</Text>
      </View>
    )
  }

  const data = asyncReport.result?.reportBody ?? []
  const createdAt = asyncReport.result?.reportHeader.createdAt as string

  const reportFooter = asyncReport.result?.reportFooter as ReportFooter

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ListHeaderComponent
            reportCreatedAt={createdAt}
            reportFooter={reportFooter}
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
  loadingContainer: {
    backgroundColor: '$white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLabel: {
    color: '$darkGray',
    marginTop: '$spacingSm',
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
