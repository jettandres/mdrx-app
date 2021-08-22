import React, { useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type SalesItem from '@app/types/SalesItem'
import HorizontalLabel from '@components/HorizontalLabel'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselItem from '@components/ReviewReport/Sales/CarouselItem'

const ListItem: FC<SalesItem> = (props) => {
  const screenWidth = useWindowDimensions().width
  const itemWidth = screenWidth * 0.92

  const [activeSlide, setActiveSlide] = useState<number>(0)

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
        itemWidth={itemWidth}
        sliderWidth={screenWidth}
        renderItem={({ index }) => (
          <CarouselItem salesItem={props} index={index} />
        )}
        onSnapToItem={setActiveSlide}
        activeSlideAlignment="start"
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.7}
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
    paddingTop: '$spacingSm',
    color: '$darkGray',
  },
  titleLabel: {
    fontSize: '$md',
    marginBottom: '$spacingSm',
    fontWeight: 'bold',
  },
  paginationContainer: {
    backgroundColor: '$white',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '$blue',
  },
})

export default ListItem
