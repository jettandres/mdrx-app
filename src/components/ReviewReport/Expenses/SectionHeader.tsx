import React, { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  title: string
  onPress: (title: string) => void
  itemCount: number
  isCollapsed: boolean
}

const SectionHeader: FC<Props> = (props) => {
  const { title, onPress, itemCount, isCollapsed } = props
  const onHeaderPress = useCallback(() => onPress(title), [onPress, title])

  return (
    <TouchableOpacity
      onPress={onHeaderPress}
      style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.sectionHeaderSubtitle}>
          {itemCount} item{itemCount > 1 ? 's' : ''}
        </Text>
        <Icon
          name={isCollapsed ? 'keyboard-arrow-right' : 'keyboard-arrow-down'}
          size={18}
          color="#202020"
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = EStyleSheet.create({
  sectionHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    borderColor: '$borderColor',
    padding: '$spacingSm',
    paddingRight: '$spacingXs',
    backgroundColor: '$white',
  },
  sectionHeaderTitle: {
    fontWeight: 'bold',
  },
  sectionHeaderSubtitle: {
    fontSize: '$xs',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default SectionHeader
