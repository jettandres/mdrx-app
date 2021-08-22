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

      <View style={styles.reportCycleLabelContainer}>
        <HorizontalLabel bold title="Report Cycle Month" subtitle="JULY" />
        <HorizontalLabel bold title="Report Year" subtitle="2021" />
      </View>

      <HorizontalLabel title="Invoice No" subtitle="503" />
    </View>
  )
}

const styles = EStyleSheet.create({
  listHeader: {
    flex: 1,
    padding: '$spacingSm',
    backgroundColor: '$white',
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
  reportCycleLabelContainer: {
    paddingVertical: '$spacingSm',
  },
})

export default ListHeaderComponent
