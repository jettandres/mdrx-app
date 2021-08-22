import React from 'react'
import { View, Text } from 'react-native'

import type { FC } from 'react'
import type SalesItem from '@app/types/SalesItem'
import HorizontalLabel from '@components/HorizontalLabel'
import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  index: number
  salesItem: SalesItem
}

const CarouselItem: FC<Props> = (props) => {
  const {
    index,
    salesItem: { pcsSold, price, income, percentage, remarks, ytd },
  } = props

  if (index === 0) {
    return (
      <View style={styles.container}>
        <HorizontalLabel title="Pcs sold" subtitle={pcsSold.toString()} />
        <HorizontalLabel title="Price" subtitle={price} />
        <HorizontalLabel title="Income" subtitle={income} />
        <HorizontalLabel title="Percentage" subtitle={percentage} />
        <HorizontalLabel title="Remarks" subtitle={remarks} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HorizontalLabel title="YTD Pcs Sold" subtitle={ytd.pcsSold.toString()} />
      <HorizontalLabel title="YTD Gross" subtitle={ytd.gross} />
      <HorizontalLabel title="YTD Income" subtitle={ytd.income} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
})

export default CarouselItem
