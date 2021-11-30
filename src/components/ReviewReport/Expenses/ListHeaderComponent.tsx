import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import { DateTime } from 'luxon'

import type { FC } from 'react'
import type Employee from '@app/types/Employee'
import { useReactiveVar } from '@apollo/client'
import { employeeInfo } from '@app/apollo/reactiveVariables'
import EmployeeFunds from '@app/types/EmployeeFunds'

type Props = {
  reportCreatedAt: string
  funds: EmployeeFunds
}

const ListHeaderComponent: FC<Props> = (props) => {
  const { reportCreatedAt, funds } = props

  const { name, custodianAssignment } = useReactiveVar(employeeInfo) as Employee

  const dateReported = DateTime.fromISO(reportCreatedAt).toLocaleString(
    DateTime.DATE_FULL,
  )

  const monthOf = DateTime.fromISO(reportCreatedAt).toFormat('LLLL yyyy')

  return (
    <View style={styles.listHeader}>
      <HorizontalLabel title="Name" subtitle={name} />
      <HorizontalLabel title="Date Reported" subtitle={dateReported} />
      <HorizontalLabel title="Assignment" subtitle={custodianAssignment} />

      <View style={styles.listSubHeader}>
        <HorizontalLabel
          title="Revolving Fund Amount"
          subtitle={funds.revolvingFundAmount}
        />
        <HorizontalLabel
          title="Replenishable Amount"
          subtitle={funds.replenishableAmount}
        />
        <HorizontalLabel title="Unused Amount" subtitle={funds.unusedAmount} />
      </View>

      <HorizontalLabel title="Month of" subtitle={monthOf} />

      <Text style={styles.listHeaderTitle}>Summary Expense</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  listHeader: {
    flex: 1,
    padding: '$spacingSm',
    backgroundColor: '$white',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
  },
  listSubHeader: {
    marginTop: '$spacingSm',
    marginBottom: '$spacingSm',
  },
  listHeaderTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '$spacingMd',
  },
})

export default ListHeaderComponent
