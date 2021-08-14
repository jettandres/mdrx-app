import React, { useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  title: string
  subtitle: string
  onPress: (title: string) => void
}

const SectionHeader: FC<Props> = (props) => {
  const { title, subtitle, onPress } = props
  const onHeaderPress = useCallback(() => onPress(title), [onPress, title])

  return (
    <TouchableOpacity
      onPress={onHeaderPress}
      style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      <Text style={styles.sectionHeaderTitle}>{subtitle}</Text>
    </TouchableOpacity>
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
