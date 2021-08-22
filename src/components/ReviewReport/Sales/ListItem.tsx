import React from 'react'
import { View, Text } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type SalesItem from '@app/types/SalesItem'
import HorizontalLabel from '@components/HorizontalLabel'

import Carousel from 'react-native-snap-carousel'
import CarouselItem from '@components/ReviewReport/Sales/CarouselItem'

const ListItem: FC<SalesItem> = (props) => {
  const {
    code,
    description,
    pcsSold,
    price,
    income,
    percentage,
    remarks,
    ytd,
  } = props

  const carouselData = [
    {
      code,
      description,
      pcsSold,
      price,
      income,
      percentage,
      remarks,
    },
    {
      ytd,
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.codeLabel}>{code}</Text>
      <Text style={styles.titleLabel}>{description}</Text>
      <Carousel
        data={carouselData}
        itemWidth={300}
        sliderWidth={300}
        renderItem={({ index }) => (
          <CarouselItem salesItem={props} index={index} />
        )}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '$white',
    padding: '$spacingSm',
  },
  codeLabel: {
    color: '$blue',
  },
  titleLabel: {
    fontSize: '$md',
    marginBottom: '$spacingSm',
  },
})

export default ListItem
