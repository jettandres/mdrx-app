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
import { toFormat, dinero } from 'dinero.js'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import SectionHeader from '@components/ReviewReport/Expenses/SectionHeader'
import ListHeaderComponent from '@components/ReviewReport/Expenses/ListHeaderComponent'
import ListFooterComponent from '@components/ReviewReport/Expenses/ListFooterComponent'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import type { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import computeExpenseReport from 'src/services/computeExpenseReport'

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

type SectionData = {
  seriesNo: string
  supplierName: string
  supplierTin: string
  netAmount: number
  kmReading?: number
}

type Sections = {
  title: {
    label: string
    total: string
  }
  data: Array<SectionData>
}

const ReviewReport: FC<Props> = (props) => {
  const [collapsedHeaders, setCollapsedHeaders] = useState<Array<string>>([])
  const { route } = props
  const expenseReportId = route.params.expenseReportId

  const asyncReport = useAsync(computeExpenseReport, [expenseReportId])

  const onSectionHeaderPress = useCallback((sectionTitle: string) => {
    setCollapsedHeaders((collapsedList) => {
      const alreadyCollapsed = collapsedList.find((v) => v === sectionTitle)
      if (alreadyCollapsed) {
        return collapsedList.filter((v) => v !== sectionTitle)
      }

      return [...collapsedList, sectionTitle]
    })
  }, [])

  const onSubmitReport = useCallback(() => {}, [])

  if (asyncReport.loading && !asyncReport.result) {
    return <ActivityIndicator animating color="#007aff" />
  }

  const data = asyncReport.result?.reportBody ?? []
  const createdAt = asyncReport.result?.reportHeader.createdAt as string

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ListHeaderComponent reportCreatedAt={createdAt} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader
            onPress={onSectionHeaderPress}
            title={title.label}
            subtitle={toFormat(
              dinero(title.total),
              ({ amount }) => `P${amount}`,
            )}
          />
        )}
        renderItem={({ item, section }) => {
          const isCollapsed = collapsedHeaders.find(
            (t) => t === section.title.label,
          )
          if (isCollapsed) {
            return null
          }

          return (
            <View style={styles.sectionItemContainer}>
              <Text style={styles.sectionItemTitle}>{item.supplierName}</Text>
              <HorizontalLabel
                title={`TIN # ${item.supplierTin}`}
                subtitle={toFormat(
                  dinero(item.netAmount),
                  ({ amount }) => `P${amount}`,
                )}
              />
              {item.kmReading && (
                <HorizontalLabel
                  title="KM reading"
                  subtitle={item.kmReading.toString()}
                />
              )}
              <View style={styles.itemButtonsContainer}>
                <TouchableOpacity>
                  <Text style={styles.viewPhotoLabel}>VIEW PHOTO</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.deletePhotoLabel}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
        ListFooterComponent={<ListFooterComponent onSubmit={onSubmitReport} />}
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
  sectionItemContainer: {
    padding: '$spacingSm',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
  },
  sectionItemTitle: {
    fontWeight: '700',
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
  itemButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '$spacingXs',
  },
  viewPhotoLabel: {
    color: '$blue',
    marginRight: '$spacingXs',
    fontSize: '$xs',
  },
  deletePhotoLabel: {
    color: '$red',
    fontSize: '$xs',
  },
})

export default ReviewReport
