import React from 'react'
import { View, Text, SectionList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'
import SectionHeader from '@components/ReviewReport/SectionHeader'

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

const ReviewReport: FC = () => {
  const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL)
  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.seriesNo.toString()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <HorizontalLabel title="Custodian Code" subtitle="2av12e" />
            <HorizontalLabel title="Name" subtitle="Johnny Cash" />
            <HorizontalLabel title="Date Reported" subtitle={currentDate} />
            <HorizontalLabel
              title="Assignment"
              subtitle="Mindanao Sales & Marketing"
            />

            <View style={styles.listSubHeader}>
              <HorizontalLabel
                title="Revolving Fund Amount"
                subtitle="P8,000.00"
              />
              <HorizontalLabel
                title="Replenishable Amount"
                subtitle="P6,445.00"
              />
              <HorizontalLabel title="Unused Amount" subtitle="P1,594.00" />
            </View>

            <HorizontalLabel title="Month of" subtitle="July 1, 2021" />

            <Text style={styles.listHeaderTitle}>Summary Expense</Text>
          </View>
        }
        renderItem={({ item }) => (
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
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title.label} subtitle={title.total} />
        )}
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
  listHeader: {
    flex: 1,
    padding: '$spacingSm',
    backgroundColor: '$white',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
  },
  listSubHeader: {
    marginTop: '$spacingSm',
    marginBottom: '$spacingSm',
  },
  listHeaderTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '$spacingMd',
  },
})

export default ReviewReport
