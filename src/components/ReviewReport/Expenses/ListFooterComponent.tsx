import React from 'react'
import { View, Text, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { FC } from 'react'
import type { ReportFooter } from '@app/services/computeExpenseReport'
import { dinero, toUnit } from 'dinero.js'
import formatCurrency from '@utils/formatCurrency'
import CarouselSection from '@components/common/CarouselSection'

type Props = {
  onSubmit: () => void
  reportFooter: ReportFooter
}

type CarouselDataItem = {
  title: string
  gross: string
  vat: string
  net: string
}

const ListFooterComponent: FC<Props> = (props) => {
  const {
    onSubmit,
    reportFooter: {
      totalReplenishable,
      yearToDate,
      totalYearToDate: { netAmount, grossAmount, vatAmount },
      avgKmPerLiter,
      totalKmReadingConsumption,
    },
  } = props

  const formattedVat = `-${toUnit(dinero(totalReplenishable.vatAmount)).toFixed(
    2,
  )}`

  const carouselData: Array<CarouselDataItem> = [
    {
      title: 'Total Replenishable',
      gross: formatCurrency(dinero(totalReplenishable.grossAmount)),
      vat: formattedVat,
      net: formatCurrency(dinero(totalReplenishable.netAmount)),
    },
    {
      title: 'Total Year',
      gross: formatCurrency(dinero(grossAmount)),
      vat: `-${toUnit(dinero(vatAmount))}`,
      net: formatCurrency(dinero(netAmount)),
    },
  ]

  return (
    <View style={styles.listFooter}>
      <CarouselSection
        renderItem={({ item }) => {
          const { title, gross, vat, net } = item as CarouselDataItem
          return (
            <View>
              <Text style={styles.totalReplenishableLable}>{title}</Text>
              <View style={styles.totalReplenishableContainer}>
                <HorizontalLabel title="Gross" bold subtitle={gross} />
                <HorizontalLabel title="VAT" subtitle={vat} />
                <HorizontalLabel title="Net" subtitle={net} />
              </View>
            </View>
          )
        }}
        carouselData={carouselData}
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
      <View style={styles.yearToDateContainer}>
        <Text style={styles.listFooterTitle}>Year to Date</Text>
        {yearToDate.map((ytd) => (
          <HorizontalLabel
            key={ytd.id}
            title={ytd.name}
            subtitle={formatCurrency(dinero(ytd.gross))}
          />
        ))}
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
  totalReplenishableContainer: {
    paddingTop: '$spacingSm',
  },
  totalReplenishableLable: {
    fontWeight: 'bold',
  },
  yearToDateContainer: {
    paddingBottom: '$spacingLg',
    marginBottom: '$spacingLg',
  },
})

export default ListFooterComponent
