import React from 'react'
import { View, Text, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
      totalKmReadingConsumption,
    },
  } = props

  return (
    <View style={styles.listFooter}>
      <HorizontalLabel
        title="Total Replenishable"
        bold
        subtitle={formatCurrency(dinero(totalReplenishable))}
      />
      <View style={styles.kmReadingContainer}>
        <View style={styles.kmReadingSubContainer}>
          <Icon
            style={styles.kmIcon}
            name="gas-station"
            size={25}
            color="#202020"
          />
          <View>
            <Text style={styles.kmReadingTitle}>
              Total Km Reading Consumption
            </Text>
            <Text style={styles.kmReadingSubtitle}>
              {totalKmReadingConsumption.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.kmReadingSubContainerAlt}>
          <Icon
            style={styles.kmIcon}
            name="speedometer"
            size={25}
            color="#202020"
          />
          <View>
            <Text style={styles.kmReadingTitle}>Ave. Km/liter</Text>
            <Text style={styles.kmReadingSubtitle}>{avgKmPerLiter}</Text>
          </View>
        </View>
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
    alignSelf: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '$spacingMd',
    paddingBottom: '$spacingXs',
  },
  kmReadingSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kmReadingSubContainerAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '$spacingXs',
  },
  kmIcon: {
    marginRight: '$spacingSm',
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
