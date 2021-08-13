import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  title: string
  subtitle: string
}

const SectionHeader: FC<Props> = (props) => {
  const { title, subtitle } = props
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      <Text style={styles.sectionHeaderTitle}>{subtitle}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  sectionHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    padding: '$spacingSm',
    backgroundColor: '$white',
  },
  sectionHeaderTitle: {
    fontWeight: 'bold',
  },
})

export default SectionHeader
