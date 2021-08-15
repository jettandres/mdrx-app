import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  reportType: 'expenses' | 'mtp'
}

type ReportData = {
  reportNumber: string
  dateReported: string
  submitted: boolean
}

const DATA: Array<ReportData> = [
  {
    reportNumber: '#12432',
    dateReported: 'August 12, 2021',
    submitted: true,
  },
  {
    reportNumber: '#12433',
    dateReported: 'August 13, 2021',
    submitted: false,
  },
  {
    reportNumber: '#12434',
    dateReported: 'August 14, 2021',
    submitted: true,
  },
]

const ReportsList: FC<Props> = (props) => {
  const { reportType } = props

  return (
    <FlatList
      style={styles.flatList}
      data={DATA}
      renderItem={({ item: { reportNumber, dateReported, submitted } }) => (
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.titleLabel}>Report {reportNumber}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.dateLabel}>{dateReported}</Text>
            {submitted && <Text style={styles.submittedLabel}>Submitted</Text>}
            {!submitted && <Text style={styles.draftLabel}>Draft</Text>}
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      keyExtractor={({ reportNumber }) => reportNumber}
    />
  )
}

const styles = EStyleSheet.create({
  flatList: {
    backgroundColor: '$white',
  },
  itemContainer: {
    padding: '$spacingSm',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '$borderColor',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    color: '$darkGray',
  },
  submittedLabel: {
    color: '$blue',
  },
  draftLabel: {
    color: '$red',
  },
  titleLabel: {
    fontWeight: 'bold',
  },
})

export default ReportsList
