import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import ExpenseReport from '@app/types/ExpenseReport'
import { DateTime } from 'luxon'

type Props = {
  data: Array<ExpenseReport>
}

const ReportsList: FC<Props> = (props) => {
  const { data } = props

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      renderItem={({ item: { reportNumber, createdAt, status } }) => (
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.titleLabel}>Report {reportNumber}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.dateLabel}>
              {DateTime.fromISO(createdAt).toLocaleString(
                DateTime.DATETIME_MED,
              )}
            </Text>
            {status === 'SUBMITTED' && (
              <Text style={styles.submittedLabel}>Submitted</Text>
            )}
            {status === 'DRAFT' && <Text style={styles.draftLabel}>Draft</Text>}
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = EStyleSheet.create({
  flatList: {
    backgroundColor: '$white',
    height: '100%',
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
