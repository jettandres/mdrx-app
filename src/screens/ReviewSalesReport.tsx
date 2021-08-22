import React, { useCallback, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type SalesItem from '@app/types/SalesItem'

import ListHeaderComponent from '@components/ReviewReport/Sales/ListHeaderComponent'
import ListFooterComponent from '@components/ReviewReport/Sales/ListFooterComponent'
import ListItem from '@components/ReviewReport/Sales/ListItem'

import { DateTime } from 'luxon'
import * as faker from 'faker'

const DATA: Array<SalesItem> = [
  {
    code: '373727',
    description: 'BVI XStar Slit Knife',
    pcsSold: 20,
    price: 'P12,000.00',
    income: 'P4,000.00',
    percentage: '15%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
  {
    code: '374891',
    description: 'BVI Optimum Slit Knife',
    pcsSold: 50,
    price: 'P30,000.00',
    income: 'P8,000.00',
    percentage: '16%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
  {
    code: '585155',
    description: 'BVI Nucleus Hydrodisector',
    pcsSold: 100,
    price: 'P20,000.00',
    income: 'P14,000.00',
    percentage: '89%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
  {
    code: '400605',
    description: 'Alcon Viscoat',
    pcsSold: 10,
    price: 'P29,000.00',
    income: 'P3,000.00',
    percentage: '4%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
  {
    code: '300101',
    description: 'Alcon Misotat',
    pcsSold: 12,
    price: 'P9,000.00',
    income: 'P2,000.00',
    percentage: '3%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
  {
    code: '581072',
    description: 'BVI Drape',
    pcsSold: 50,
    price: 'P26,000.00',
    income: 'P8,000.00',
    percentage: '13%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
]

const ReviewSalesReport: FC = () => {
  const onSubmitReport = useCallback(() => {}, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<ListHeaderComponent />}
        renderItem={({ item }) => <ListItem {...item} />}
        ListFooterComponent={<ListFooterComponent onSubmit={onSubmitReport} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
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
  divider: {
    marginVertical: 1,
    alignSelf: 'center',
  },
})

export default ReviewSalesReport
