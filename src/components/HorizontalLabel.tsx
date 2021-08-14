import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  title: string
  subtitle: string
  bold?: boolean
}

const HorizontalLabel: FC<Props> = (props) => {
  const { title, subtitle, bold = false } = props
  const fontStyle = bold ? styles.labelHighlight : null

  return (
    <View style={styles.container}>
      <Text style={fontStyle}>{title}</Text>
      <Text style={fontStyle}>{subtitle}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelHighlight: {
    fontWeight: 'bold',
  },
})

export default HorizontalLabel
