import React from 'react'
import { View, Text, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { useRoute } from '@react-navigation/native'
import HorizontalLabel from '@components/HorizontalLabel'

type FlatlistEntries = {
  title: string
  value: string
}

const DATA: Array<FlatlistEntries> = [
  {
    title: 'Gas',
    value: 'P1,800.00',
  },
  {
    title: 'Office Supplies',
    value: 'P300.00',
  },
  {
    title: 'Representation Meals',
    value: 'P600.00',
  },
  {
    title: 'Courier',
    value: 'P120.00',
  },
  {
    title: 'Hotel',
    value: 'P0.00',
  },
  {
    title: 'Parking',
    value: 'P300.00',
  },
  {
    title: 'Mobile Phone Bill',
    value: 'P800.00',
  },
]

const ExpenseReportDetails: FC = () => {
  const route = useRoute()
  if (route.name === 'Total') {
    // TODO: display total instead
  }

  return (
    <FlatList
      style={styles.container}
      data={DATA}
      ListHeaderComponent={() => <View style={styles.headerContainer} />}
      renderItem={({ item: { title, value } }) => (
        <View style={styles.itemContainer}>
          <HorizontalLabel title={title} subtitle={value} />
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.itemContainer}>
          <HorizontalLabel
            bold
            title={route.name === 'Total' ? 'Grand Total' : 'Subtotal'}
            subtitle="P3,920.00"
          />
        </View>
      )}
      keyExtractor={({ title }, index) => `${title}-${index}`}
    />
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  itemContainer: {
    padding: '$spacingSm',
  },
  headerContainer: {
    height: '$spacingXs',
  },
})

export default ExpenseReportDetails
