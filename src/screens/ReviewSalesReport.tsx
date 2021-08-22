import React, { useCallback, useState } from 'react'
import { View, Text, SectionList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import SectionHeader from '@components/ReviewReport/Sales/SectionHeader'
import ListHeaderComponent from '@components/ReviewReport/Sales/ListHeaderComponent'
import ListFooterComponent from '@components/ReviewReport/Sales/ListFooterComponent'

import { DateTime } from 'luxon'
import * as faker from 'faker'

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

const ReviewSalesReport: FC = () => {
  const [collapsedHeaders, setCollapsedHeaders] = useState<Array<string>>([])
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

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.seriesNo.toString()}
        ListHeaderComponent={<ListHeaderComponent />}
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
})

export default ReviewSalesReport
