import React from 'react'
import { View, Text, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import type { FC } from 'react'
import type { ReportFooter } from '@app/services/computeExpenseReport'
import { dinero } from 'dinero.js'
import formatCurrency from '@utils/formatCurrency'

type Props = {
  onSubmit: () => void
  reportFooter: ReportFooter
}

const ListFooterComponent: FC<Props> = (props) => {
  const {
    onSubmit,
    reportFooter: {
      totalReplenishable,
      yearToDate,
      totalYearToDate,
      avgKmPerLiter,
      totalLitersAdded,
    },
  } = props

  return (
    <View style={styles.listFooter}>
      <HorizontalLabel
        title="Total Replenishable"
        subtitle={formatCurrency(dinero(totalReplenishable))}
      />
      <View style={styles.kmReadingContainer}>
        <Text style={styles.kmReadingTitle}>Total Km Reading Consumption</Text>
        <Text style={styles.kmReadingSubtitle}>
          {totalLitersAdded.toFixed(2)}
        </Text>
        <Text style={styles.kmReadingSubtitle}>{avgKmPerLiter}</Text>
        <Text style={styles.kmReadingTitle}>Ave. Km/liter</Text>
      </View>

      <Text style={styles.listFooterTitle}>Year to Date</Text>
      {yearToDate.map((ytd) => (
        <HorizontalLabel
          key={ytd.id}
          title={ytd.name}
          subtitle={formatCurrency(dinero(ytd.amount))}
        />
      ))}

      <View style={styles.listFooterTotalYearContainer}>
        <HorizontalLabel
          title="Total Year"
          subtitle={formatCurrency(dinero(totalYearToDate))}
          bold
        />
      </View>

      <Button onPress={onSubmit} title="Submit Report" />
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
    marginBottom: '$spacingXl',
  },
})

export default ListFooterComponent
