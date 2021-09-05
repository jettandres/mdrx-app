import React, { useState, useCallback } from 'react'
import { View, Text, SectionList } from 'react-native'

import type { FC } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { CollectionSummaryTabParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/core'

import CollectionType from '@app/types/CollectionType'
import HorizontalLabel from '@components/HorizontalLabel'
import SectionHeader from '@components/ReviewReport/Expenses/SectionHeader'

type SectionData = {
  type: CollectionType
  id: number
  amount: string
  agingDays: number
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
      },
      {
        type: 'sales-invoice',
        id: 501,
        amount: 'P3,456.00',
        agingDays: 78,
      },
      {
        type: 'sales-invoice',
        id: 502,
        amount: 'P8,990.00',
        agingDays: 68,
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
      },
      {
        type: 'delivery-receipt',
        id: 1157,
        amount: 'P2,345.00',
        agingDays: 28,
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

const Collections: FC<Props> = () => {
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

  return (
    <SectionList
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

        return <Text>{item.type}</Text>
      }}
    />
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeaderContainer: {
    padding: '$spacingSm',
    backgroundColor: '$white',
  },
})

export default Collections
