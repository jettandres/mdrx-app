import React from 'react'
import { View, Text, Button } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import type { FC } from 'react'

type Props = {
  onSubmit: () => void
}

const ListFooterComponent: FC<Props> = (props) => {
  const { onSubmit } = props

  return (
    <View style={styles.listFooter}>
      <Text style={styles.listFooterTitle}>Total</Text>
      <HorizontalLabel title="Price" subtitle="P126,000.00" />
      <HorizontalLabel title="Income" subtitle="P39,000.00" />
      <HorizontalLabel title="Percentage" subtitle="31%" />

      <View style={styles.listFooterTotalYearContainer}>
        <HorizontalLabel title="Remarks" subtitle="aceptable" bold />
      </View>

      <Button onPress={onSubmit} title="Submit Report" />
    </View>
  )
}

const styles = EStyleSheet.create({
  listFooter: {
    flex: 1,
    padding: '$spacingSm',
    backgroundColor: '$white',
    borderColor: '$borderColor',
    paddingBottom: '10%',
  },
  kmReadingContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '$spacingMd',
  },
  listFooterTitle: {
    fontWeight: 'bold',
    fontSize: '$sm',
    alignSelf: 'flex-start',
    marginTop: '$spacingMd',
    marginBottom: '$spacingMd',
  },
  listFooterTotalYearContainer: {
    marginTop: '$spacingSm',
    marginBottom: '$spacingXl',
  },
})

export default ListFooterComponent
