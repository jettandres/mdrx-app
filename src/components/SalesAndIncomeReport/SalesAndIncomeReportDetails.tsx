import React from 'react'
import { View, Text, SectionList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { DateTime } from 'luxon'

import type { FC } from 'react'

import HorizontalLabel from '@components/HorizontalLabel'

import { salesAndIncomeSelectedYear } from '@app/apollo/reactiveVariables'
import { useReactiveVar } from '@apollo/client'

type SectionData = {
  sales: string
  income: string
}

type Sections = {
  title: string
  data: Array<SectionData>
}

const SalesAndIncomeReportDetails: FC = () => {
  const selectedYear = useReactiveVar(salesAndIncomeSelectedYear)
  const currentYear = DateTime.now().year

  const isSameYear = selectedYear === currentYear
  const monthSectionsToRender = isSameYear ? DateTime.now().month : 12

  const sectionData: Array<Sections> = []

  for (let x = 1; x <= monthSectionsToRender; x++) {
    const sectionName = DateTime.fromFormat(x.toString(), 'M').toFormat('MMMM')

    sectionData.push({
      title: sectionName,
      data: [{ sales: 'P100,000.00', income: 'P20,000.00' }],
    })
  }

  return (
    <SectionList
      keyExtractor={(_, index) => index.toString()}
      sections={sectionData}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeaderTitle}>{title}</Text>
        </View>
      )}
      renderItem={({ item: { sales, income }, section }) => (
        <View style={styles.sectionItemContainer}>
          <HorizontalLabel title="Sales" subtitle={sales} />
          <HorizontalLabel title="Income" subtitle={income} />
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.sectionFooterContainer}>
          <Text style={styles.sectionHeaderTitle}>TOTAL</Text>
          <HorizontalLabel title="Sales" subtitle="P7,317,005.00" />
          <HorizontalLabel title="Income" subtitle="P3,723,062.00" />
        </View>
      )}
    />
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderContainer: {
    backgroundColor: '$white',
    paddingTop: '$spacingMd',
    paddingHorizontal: '$spacingSm',
  },
  sectionItemContainer: {
    backgroundColor: '$white',
    paddingHorizontal: '$spacingSm',
  },
  sectionFooterContainer: {
    backgroundColor: '$white',
    padding: '$spacingSm',
  },
  sectionHeaderTitle: {
    fontWeight: 'bold',
  },
})

export default SalesAndIncomeReportDetails
