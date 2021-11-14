import React, { useState, useCallback } from 'react'
import { View, Text, SectionList, TouchableOpacity } from 'react-native'

import SectionHeader from '@components/common/SectionHeader'
import HorizontalLabel from '@components/HorizontalLabel'

import type { FC } from 'react'
import CollectionType from '@app/types/CollectionType'

import EStyleSheet from 'react-native-extended-stylesheet'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { CollectionSummaryTabParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

type SectionData = {
  type: CollectionType
  id: number
  amount: string
  agingDays: number
  collectionDate: string
  collectionReceiptNo?: string
}

type Sections = {
  title: {
    label: string
    total: string
  }
  data: Array<SectionData>
}

const DATA: Array<Sections> = [
  {
    title: {
      label: 'Sales Invoice',
      total: 'P1,513,483.00',
    },
    data: [
      {
        type: 'sales-invoice',
        id: 500,
        amount: 'P323,000.00',
        agingDays: 78,
        collectionDate: 'Sept 1, 2021',
        collectionReceiptNo: '2398-3423-123',
      },
      {
        type: 'sales-invoice',
        id: 501,
        amount: 'P3,456.00',
        agingDays: 78,
        collectionDate: 'Sept 3, 2021',
        collectionReceiptNo: '2398-2323-123',
      },
      {
        type: 'sales-invoice',
        id: 502,
        amount: 'P8,990.00',
        agingDays: 30,
        collectionDate: 'Sept 2, 2021',
        collectionReceiptNo: '2111-2323-123',
      },
    ],
  },
  {
    title: {
      label: 'Delivery Receipt',
      total: 'P74,124.00',
    },
    data: [
      {
        type: 'delivery-receipt',
        id: 1155,
        amount: 'P340.00',
        agingDays: 78,
        collectionDate: 'Sept 2, 2021',
      },
      {
        type: 'delivery-receipt',
        id: 1157,
        amount: 'P2,345.00',
        agingDays: 28,
        collectionDate: 'Sept 2, 2021',
      },
    ],
  },
  {
    title: {
      label: 'Cash',
      total: 'P4,299.00',
    },
    data: [
      {
        type: 'cash',
        id: 34,
        amount: 'P300.00',
        agingDays: 78,
        collectionDate: 'Sept 8, 2021',
      },
      {
        type: 'cash',
        id: 35,
        amount: 'P2,499.00',
        agingDays: 28,
        collectionDate: 'Sept 12, 2021',
      },
      {
        type: 'cash',
        id: 36,
        amount: 'P1,500.00',
        agingDays: 28,
        collectionDate: 'Sept 12, 2021',
      },
    ],
  },
]

type RemittanceNavigationProp = MaterialTopTabNavigationProp<
  CollectionSummaryTabParamList,
  'Remittance'
>

type RemittanceRouteProp = RouteProp<
  CollectionSummaryTabParamList,
  'Remittance'
>

type Props = {
  navigation: RemittanceNavigationProp
  route: RemittanceRouteProp
}

const Remittance: FC<Props> = () => {
  const [collapsedHeaders, setCollapsedHeaders] = useState<Array<string>>([])
  const onSectionHeaderPress = useCallback((sectionTitle: string) => {
    setCollapsedHeaders((collapsedList) => {
      const alreadyCollapsed = collapsedList.find((v) => v === sectionTitle)
      if (alreadyCollapsed) {
        return collapsedList.filter((v) => v !== sectionTitle)
      }

      return [...collapsedList, sectionTitle]
    })
  }, [])

  const onCollect = useCallback((item: SectionData) => {}, [])

  return (
    <SectionList
      style={styles.container}
      sections={DATA}
      keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
      renderSectionHeader={({
        section: {
          title: { label, total },
        },
      }) => (
        <SectionHeader
          onPress={onSectionHeaderPress}
          title={label}
          subtitle={total}
        />
      )}
      renderItem={({ item, section }) => {
        const isCollapsed = collapsedHeaders.find(
          (t) => t === section.title.label,
        )
        if (isCollapsed) {
          return null
        }

        return (
          <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
              <HorizontalLabel
                bold
                title={`No.${item.id}`}
                subtitle={item.amount}
              />
            </View>
            <View style={styles.collectionReceiptNoContainer}>
              <Text style={styles.subtitleLabelNormal}>Collection Date</Text>
              <Text style={styles.subtitleLabelNormal}>
                {item.collectionDate}
              </Text>
            </View>
            {!!item.collectionReceiptNo && (
              <View style={styles.collectionReceiptNoContainer}>
                <Text style={styles.subtitleLabelNormal}>
                  Collection Receipt No.
                </Text>
                <Text style={styles.subtitleLabelNormal}>
                  {item.collectionReceiptNo}
                </Text>
              </View>
            )}
            <View style={styles.cardFooterContainer}>
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.collectLabel}>VIEW DEPOSIT SLIP</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
      ListFooterComponent={() => (
        <View style={styles.footerContainer}>
          <HorizontalLabel bold title="TOTAL" subtitle="P123,242,321.00" />
        </View>
      )}
    />
  )
}

const styles = EStyleSheet.create({
  sectionHeaderContainer: {
    padding: '$spacingSm',
    backgroundColor: '$white',
  },
  footerContainer: {
    backgroundColor: '$white',
    padding: '$spacingSm',
  },
  itemContainer: {
    borderRadius: 10,
    backgroundColor: '$white',
    elevation: 2,
    marginHorizontal: '$spacingSm',
    marginVertical: '$spacingXs',
  },
  itemTitleContainer: {
    paddingLeft: '$spacingSm',
    paddingTop: '$spacingSm',
    paddingRight: '$spacingSm',
    marginBottom: '$spacingXs',
  },
  subtitleLabelNormal: {
    color: '$darkGray',
    paddingHorizontal: '$spacingSm',
  },
  ctaButton: {
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '$spacingSm',
    borderRadius: 5,
  },
  collectLabel: {
    color: '$blue',
    fontWeight: 'bold',
    fontSize: '$sm',
    marginLeft: '$spacingSm',
  },
  collectionReceiptNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooterContainer: {
    marginTop: '$spacingSm',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: '$borderColor',
  },
})

export default Remittance
