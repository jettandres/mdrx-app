import React, { useState, useCallback } from 'react'
import { View, Text, SectionList, TouchableOpacity } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import {
  CollectionSummaryTabParamList,
  RootStackParamList,
} from '@routes/types'
import { RouteProp, useNavigation } from '@react-navigation/core'

import CollectionType from '@app/types/CollectionType'
import HorizontalLabel from '@components/HorizontalLabel'
import SectionHeader from '@components/ReviewReport/Expenses/SectionHeader'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type SectionData = {
  type: CollectionType
  id: number
  amount: string
  agingDays: number
  submissionDate: string
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
        submissionDate: 'August 3, 2021',
      },
      {
        type: 'sales-invoice',
        id: 501,
        amount: 'P3,456.00',
        agingDays: 78,
        submissionDate: 'August 21, 2021',
      },
      {
        type: 'sales-invoice',
        id: 502,
        amount: 'P8,990.00',
        agingDays: 30,
        submissionDate: 'August 15, 2021',
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
        submissionDate: 'August 8, 2021',
      },
      {
        type: 'delivery-receipt',
        id: 1157,
        amount: 'P2,345.00',
        agingDays: 28,
        submissionDate: 'August 12, 2021',
      },
    ],
  },
]

type CollectionsNavigationProp = MaterialTopTabNavigationProp<
  CollectionSummaryTabParamList,
  'Collections'
>

type CollectionsRouteProp = RouteProp<
  CollectionSummaryTabParamList,
  'Collections'
>

type Props = {
  navigation: CollectionsNavigationProp
  route: CollectionsRouteProp
}

type HomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'HomeDrawer'
>

const Collections: FC<Props> = () => {
  const navigation = useNavigation<HomeNavigation>()

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

  const onCollect = useCallback(
    (item: SectionData) => {
      navigation.navigate('SalesCollectionForm', { collectionType: item.type })
    },
    [navigation],
  )

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

        const agingStyle =
          item.agingDays > 60
            ? styles.subtitleLabelAlert
            : styles.subtitleLabelNormal

        return (
          <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
              <HorizontalLabel
                bold
                title={`No.${item.id}`}
                subtitle={item.amount}
              />
            </View>
            <View style={styles.submissionDateLabelContainer}>
              <Text style={styles.subtitleLabelNormal}>Submission Date</Text>
              <Text style={styles.subtitleLabelNormal}>
                {item.submissionDate}
              </Text>
            </View>
            <View style={styles.agingDaysLabelContainer}>
              <Text style={styles.subtitleLabelNormal}>Aging Days</Text>
              <Text style={agingStyle}>{item.agingDays} days</Text>
            </View>
            <View style={styles.cardFooterContainer}>
              <TouchableOpacity
                style={styles.collectButton}
                onPress={() => onCollect(item)}>
                <Text style={styles.collectLabel}>COLLECT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
    />
  )
}

const styles = EStyleSheet.create({
  container: {},
  sectionHeaderContainer: {
    padding: '$spacingSm',
    backgroundColor: '$white',
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
  },
  subtitleLabelNormal: {
    color: '$darkGray',
    paddingHorizontal: '$spacingSm',
  },
  subtitleLabelAlert: {
    color: '$red',
    paddingHorizontal: '$spacingSm',
  },
  collectButton: {
    width: '30%',
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
  cardFooterContainer: {
    marginTop: '$spacingSm',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: '$borderColor',
  },
  submissionDateLabelContainer: {
    marginTop: '$spacingSm',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  agingDaysLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default Collections
