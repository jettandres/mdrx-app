import React, { useState } from 'react'
import { View, useWindowDimensions, ListRenderItem } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'

type Props = {
  renderItem: ListRenderItem<unknown>
  carouselData: Array<unknown>
}

const CarouselSection: FC<Props> = (props) => {
  const screenWidth = useWindowDimensions().width
  const itemWidth = screenWidth * 0.92

  const [activeSlide, setActiveSlide] = useState<number>(0)

  const { renderItem, carouselData } = props

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselData}
        layout="default"
        itemWidth={itemWidth}
        sliderWidth={screenWidth}
        renderItem={renderItem}
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
  },
  titleLabel: {
    paddingTop: '$spacingSm',
    color: '$dark',
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

export default CarouselSection
