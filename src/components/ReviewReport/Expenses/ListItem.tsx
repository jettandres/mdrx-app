import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { SectionData } from '@app/services/computeExpenseReport'
import HorizontalLabel from '@components/HorizontalLabel'
import formatCurrency from '@utils/formatCurrency'
import { dinero } from 'dinero.js'

type Props = SectionData & {
  onViewPhoto: (imageKey: string) => void
  onDeletePress: (id: string) => void
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
  } = props

  return (
    <View style={styles.sectionItemContainer}>
      <Text style={styles.sectionItemTitle}>{supplierName}</Text>
      <Text>TIN # {supplierTin}</Text>
      {kmReading && <Text>km reading: {kmReading.toString()}km</Text>}
      <View style={styles.itemButtonsContainer}>
        <TouchableOpacity onPress={() => onViewPhoto(imageKey)}>
          <Text style={styles.viewPhotoLabel}>VIEW PHOTO</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeletePress(id)}>
          <Text style={styles.deletePhotoLabel}>DELETE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemAmountContainer}>
        <HorizontalLabel
          title={`Gross`}
          subtitle={formatCurrency(dinero(netAmount))}
        />
        <HorizontalLabel title={`VAT`} subtitle="12.32" />
        <HorizontalLabel
          title={`Net`}
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
