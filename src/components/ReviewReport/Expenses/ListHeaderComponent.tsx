import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import { currentDate } from '@utils/date'

import type { FC } from 'react'

const ListHeaderComponent: FC = () => {
  return (
    <View style={styles.listHeader}>
      <HorizontalLabel title="Custodian Code" subtitle="2av12e" />
      <HorizontalLabel title="Name" subtitle="Johnny Cash" />
      <HorizontalLabel title="Date Reported" subtitle={currentDate} />
      <HorizontalLabel
        title="Assignment"
        subtitle="Mindanao Sales & Marketing"
      />

      <View style={styles.listSubHeader}>
        <HorizontalLabel title="Revolving Fund Amount" subtitle="P8,000.00" />
        <HorizontalLabel title="Replenishable Amount" subtitle="P6,445.00" />
        <HorizontalLabel title="Unused Amount" subtitle="P1,594.00" />
      </View>

      <HorizontalLabel title="Month of" subtitle="July 1, 2021" />

      <Text style={styles.listHeaderTitle}>Summary Expense</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
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

export default ListHeaderComponent
