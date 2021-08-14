import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import type { FC } from 'react'

const ListFooterComponent: FC = () => {
  return (
    <View style={styles.listFooter}>
      <HorizontalLabel title="Total Replenishable" subtitle="P5,000.00" />
      <View style={styles.kmReadingContainer}>
        <Text style={styles.kmReadingTitle}>Total Km Reading Consumption</Text>
        <Text style={styles.kmReadingSubtitle}>480.0</Text>
        <Text style={styles.kmReadingSubtitle}>10km/Liter</Text>
        <Text style={styles.kmReadingTitle}>Ave. Km/liter</Text>
      </View>

      <Text style={styles.listFooterTitle}>Year to Date</Text>
      <HorizontalLabel title="Office Supplies" subtitle="P15,000.00" />
      <HorizontalLabel title="Gas" subtitle="P10,000.00" />
      <HorizontalLabel title="Representation Meals" subtitle="P25,000.00" />

      <View style={styles.listFooterTotalYearContainer}>
        <HorizontalLabel title="Total Year" subtitle="P50,000.00" bold />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  listFooter: {
    flex: 1,
    padding: '$spacingSm',
    backgroundColor: '$white',
    borderColor: '$borderColor',
    paddingBottom: '10%',
  },
  kmReadingContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '$spacingMd',
  },
  kmReadingTitle: {
    fontSize: '$xs',
  },
  kmReadingSubtitle: {
    fontWeight: 'bold',
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

export default ListFooterComponent
