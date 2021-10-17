import React from 'react'
import { TouchableOpacity } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { FC } from 'react'

type Props = {
  onPress: () => void
}

const ICON_SIZE = 25

const DeleteButton: FC<Props> = (props) => {
  const { onPress } = props
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name="delete" size={ICON_SIZE} color="#7A7A7A" />
    </TouchableOpacity>
  )
}

const styles = EStyleSheet.create({
  button: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DeleteButton
