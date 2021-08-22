import React from 'react'
import { View, Text } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import type SalesItem from '@app/types/SalesItem'
import HorizontalLabel from '@components/HorizontalLabel'

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

  return (
    <View style={styles.container}>
      <Text>{code}</Text>
      <Text>{description}</Text>
      <HorizontalLabel title="Pcs sold" subtitle={pcsSold.toString()} />
      <HorizontalLabel title="Price" subtitle={price} />
      <HorizontalLabel title="Income" subtitle={income} />
      <HorizontalLabel title="Percentage" subtitle={percentage} />
      <HorizontalLabel title="Remarks" subtitle={remarks} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '$white',
    padding: '$spacingSm',
  },
})

export default ListItem
