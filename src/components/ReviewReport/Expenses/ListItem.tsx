import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { SectionData } from '@app/services/computeExpenseReport'
import HorizontalLabel from '@components/HorizontalLabel'
import formatCurrency from '@utils/formatCurrency'
import { dinero, toUnit } from 'dinero.js'

type Props = SectionData & {
  onViewPhoto: (imageKey: string) => void
  onDeletePress: (id: string) => void
  reviewOnly?: boolean
}

const ListItem: FC<Props> = (props) => {
  const {
    supplierName,
    supplierTin,
    kmReading,
    imageKey,
    onViewPhoto,
    onDeletePress,
    id,
    netAmount,
    litersAdded,
    grossAmount,
    vatAmount,
    reviewOnly,
  } = props

  const formattedVat = `-${toUnit(dinero(vatAmount)).toFixed(2)}`

  return (
    <View style={styles.sectionItemContainer}>
      <Text style={styles.sectionItemTitle}>{supplierName}</Text>
      {!!supplierTin && <Text>TIN # {supplierTin}</Text>}
      {kmReading && <Text>km reading: {kmReading.toString()}km</Text>}
      {litersAdded && (
        <Text>
          liters added: {litersAdded.toString()} liter
          {litersAdded > 1 ? 's' : ''}
        </Text>
      )}
      <View style={styles.itemButtonsContainer}>
        <TouchableOpacity onPress={() => onViewPhoto(imageKey)}>
          <Text style={styles.viewPhotoLabel}>VIEW PHOTO</Text>
        </TouchableOpacity>
        {!reviewOnly && (
          <TouchableOpacity onPress={() => onDeletePress(id)}>
            <Text style={styles.deletePhotoLabel}>DELETE</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.itemAmountContainer}>
        <HorizontalLabel
          title="Gross"
          subtitle={formatCurrency(dinero(grossAmount))}
        />
        <HorizontalLabel title="VAT" subtitle={formattedVat} />
        <HorizontalLabel
          title="Net"
          subtitle={formatCurrency(dinero(netAmount))}
        />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  rootExpanded: {
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    paddingHorizontal: '$spacingSm',
    backgroundColor: '$white',
    paddingBottom: '$spacingLg',
    paddingTop: '$spacingMd',
  },
  rootCollapsed: {
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    paddingHorizontal: '$spacingSm',
    backgroundColor: '$white',
    paddingBottom: '$spacingLg',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontWeight: 'bold' },
  sectionItemContainer: {
    padding: '$spacingSm',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    paddingHorizontal: '$spacingSm',
  },
  sectionItemTitle: {
    fontWeight: '700',
  },
  itemButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '$spacingXs',
  },
  itemAmountContainer: {
    marginTop: '$spacingSm',
  },
  viewPhotoLabel: {
    color: '$blue',
    marginRight: '$spacingXs',
    fontSize: '$xs',
  },
  deletePhotoLabel: {
    color: '$red',
    fontSize: '$xs',
  },
})

export default ListItem
