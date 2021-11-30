import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HorizontalLabel from '@components/HorizontalLabel'

import { DateTime } from 'luxon'

import type { FC } from 'react'
import type Employee from '@app/types/Employee'
import { useReactiveVar } from '@apollo/client'
import { employeeInfo } from '@app/apollo/reactiveVariables'
import formatCurrency from '@utils/formatCurrency'
import { dinero, subtract } from 'dinero.js'
import { ReportFooter } from '@app/services/computeExpenseReport'

type Props = {
  reportCreatedAt: string
  reportFooter: ReportFooter
}

type FormattedFunds = {
  revolvingFundAmount: string
  replenishableAmount: string
  unusedAmount: string
}

const ListHeaderComponent: FC<Props> = (props) => {
  const { reportCreatedAt, reportFooter } = props

  const { name, custodianAssignment, funds } = useReactiveVar(
    employeeInfo,
  ) as Employee

  const dateReported = DateTime.fromISO(reportCreatedAt).toLocaleString(
    DateTime.DATE_FULL,
  )

  const monthOf = DateTime.fromISO(reportCreatedAt).toFormat('LLLL yyyy')

  const formattedFunds: FormattedFunds = useMemo(() => {
    if (!funds) {
      return {
        revolvingFundAmount: 'P0.00',
        replenishableAmount: '-P0.00',
        unusedAmount: 'P0.00',
      }
    } else {
      const revFundAmount = dinero(funds)
      const repAmount = dinero(reportFooter.totalReplenishable.grossAmount)
      const unusedAmount = subtract(revFundAmount, repAmount)
      return {
        revolvingFundAmount: formatCurrency(revFundAmount),
        replenishableAmount: `-${formatCurrency(repAmount)}`,
        unusedAmount: formatCurrency(unusedAmount),
      }
    }
  }, [funds, reportFooter.totalReplenishable.grossAmount])

  return (
    <View style={styles.listHeader}>
      <HorizontalLabel title="Name" subtitle={name} />
      <HorizontalLabel title="Date Reported" subtitle={dateReported} />
      <HorizontalLabel title="Assignment" subtitle={custodianAssignment} />

      <View style={styles.listSubHeader}>
        <HorizontalLabel
          title="Revolving Fund Amount"
          subtitle={formattedFunds.revolvingFundAmount}
        />
        <HorizontalLabel
          title="Replenishable Amount"
          subtitle={formattedFunds.replenishableAmount}
        />
        <HorizontalLabel
          title="Unused Amount"
          subtitle={formattedFunds.unusedAmount}
        />
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
