import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import SectionHeader from '@components/ReviewReport/Expenses/SectionHeader'
import ListHeaderComponent from '@components/ReviewReport/Expenses/ListHeaderComponent'
import ListFooterComponent from '@components/ReviewReport/Expenses/ListFooterComponent'

import * as faker from 'faker'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import type { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'
import { useQuery } from '@apollo/client'
import {
  QueryExpenseReportDetailsPayload,
  QueryExpenseReportDetailsResponse,
  QUERY_EXPENSE_REPORT_DETAILS,
} from '@app/apollo/gql/expense'

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
  seriesNo: number
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

const DATA: Array<Sections> = [
  {
    title: {
      label: 'Office Supplies',
      total: 'P600.00',
    },
    data: [
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 357,
      },
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 178,
      },
    ],
  },
  {
    title: {
      label: 'Gas',
      total: 'P2,500.00',
    },
    data: [
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 1339.29,
        kmReading: 15000,
      },
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 446.43,
        kmReading: 15300,
      },
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 446.43,
        kmReading: 15480,
      },
    ],
  },
  {
    title: {
      label: 'Representation Meals',
      total: 'P1,900.00',
    },
    data: [
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 535.71,
      },
      {
        seriesNo: faker.datatype.number(1000),
        supplierName: faker.company.companyName(),
        supplierTin: faker.datatype.number().toString(),
        netAmount: 714.29,
      },
    ],
  },
]

const ReviewReport: FC<Props> = (props) => {
  const [collapsedHeaders, setCollapsedHeaders] = useState<Array<string>>([])
  const { route } = props
  const expenseReportId = route.params.expenseReportId

  const { data, loading, error } = useQuery<
    QueryExpenseReportDetailsResponse,
    QueryExpenseReportDetailsPayload
  >(QUERY_EXPENSE_REPORT_DETAILS, {
    variables: {
      expenseReportId,
    },
  })

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

  if (!data || loading) {
    return <ActivityIndicator animating color="#007aff" />
  }

  console.log('DATA', data)

  const { createdAt } = data.expenseReport

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.seriesNo.toString()}
        ListHeaderComponent={
          <ListHeaderComponent reportCreatedAt={createdAt} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader
            onPress={onSectionHeaderPress}
            title={title.label}
            subtitle={title.total}
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
                subtitle={`P${item.netAmount.toFixed(2)}`}
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
