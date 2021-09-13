import React, { useState, useCallback } from 'react'
import { Switch, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'
import { Control, useController } from 'react-hook-form'

type Props = {
  title: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}

const HorizontalSwitch: FC<Props> = (props) => {
  const { title, control, name } = props
  const { field } = useController({ control, name, defaultValue: false })

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Switch value={field.value} onValueChange={field.onChange} />
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
