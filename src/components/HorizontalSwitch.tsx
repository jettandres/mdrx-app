import React, { useState, useCallback } from 'react'
import { Switch, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  title: string
}

const HorizontalSwitch: FC<Props> = (props) => {
  const { title } = props
  const [isEnabled, setIsEnabled] = useState(true)
  const onChange = useCallback(() => setIsEnabled((v) => !v), [])

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Switch value={isEnabled} onChange={onChange} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '$spacingSm',
    paddingBottom: '$spacingSm',
  },
})

export default HorizontalSwitch
