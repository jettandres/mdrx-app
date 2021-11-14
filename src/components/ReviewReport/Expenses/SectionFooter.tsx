import React from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import type { FC } from 'react'

type Props = {
  netAmount: string
  grossAmount: string
  vatAmount: string
  isCollapsed: boolean
}

const SectionFooter: FC<Props> = (props) => {
  const { netAmount, grossAmount, vatAmount, isCollapsed } = props
  const rootStyle = isCollapsed ? styles.rootCollapsed : styles.rootExpanded

  return (
    <View style={rootStyle}>
      <View style={styles.container}>
        <Text>Gross</Text>
        <Text>{grossAmount}</Text>
      </View>
      <View style={styles.container}>
        <Text>VAT</Text>
        <Text>-{vatAmount}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Net</Text>
        <Text style={styles.title}>{netAmount}</Text>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  rootExpanded: {
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    paddingHorizontal: '$spacingSm',
    backgroundColor: '$white',
    paddingBottom: '$spacingLg',
    paddingTop: '$spacingMd',
  },
  rootCollapsed: {
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    paddingHorizontal: '$spacingSm',
    backgroundColor: '$white',
    paddingBottom: '$spacingLg',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontWeight: 'bold' },
  subtitle: {},
})

export default SectionFooter
