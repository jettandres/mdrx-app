import React from 'react'
import { View, Text, SectionList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

import { useRoute } from '@react-navigation/core'
import HorizontalLabel from '@components/HorizontalLabel'

type SectionData = {
  sales: string
  income: string
}

type Sections = {
  title: string
  data: Array<SectionData>
}

const DATA: Array<Sections> = [
  {
    title: 'Jan 2021',
    data: [{ sales: 'P100,000.00', income: 'P20,000.00' }],
  },
]

const SalesAndIncomeReportDetails: FC = () => {
  const route = useRoute()

  return (
    <SectionList
      keyExtractor={(_, index) => index.toString()}
      sections={DATA}
      renderSectionHeader={({ section: { title } }) => (
        <View>
          <Text>{title}</Text>
        </View>
      )}
      renderItem={({ item: { sales, income }, section }) => (
        <View>
          <HorizontalLabel title="Sales" subtitle={sales} />
          <HorizontalLabel title="Income" subtitle={income} />
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
})

export default SalesAndIncomeReportDetails
