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
    code: faker.datatype.number(10000).toString(),
    description: 'BVI XStar Slit Knife',
    pcsSold: faker.datatype.number(50),
    price: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    income: `P${faker.finance.amount(100, 5000, 2).toString()}`,
    percentage: '15%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 10000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },
  {
    code: faker.datatype.number(10000).toString(),
    description: 'BVI Optimium Slit Knife',
    pcsSold: faker.datatype.number(50),
    price: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    income: `P${faker.finance.amount(100, 7000, 2).toString()}`,
    percentage: '10%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 100000, 2).toString()}`,
      income: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    },
  },

  {
    code: faker.datatype.number(10000).toString(),
    description: 'BVI Nucleus Hydrodisector',
    pcsSold: faker.datatype.number(50),
    price: `P${faker.finance.amount(100, 10000, 2).toString()}`,
    income: `P${faker.finance.amount(100, 3000, 2).toString()}`,
    percentage: '15%',
    remarks: 'acceptable',
    ytd: {
      pcsSold: faker.datatype.number(500),
      gross: `P${faker.finance.amount(100, 100000, 2).toString()}`,
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
