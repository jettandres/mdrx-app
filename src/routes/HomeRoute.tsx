import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'

import type { FC } from 'react'

import Home from '@screens/Home'
import ExpenseReport from '@screens/SummaryReports/ExpenseReport'
import SalesAndIncomeReport from '@screens/SummaryReports/SalesAndIncomeReport'
import CollectionSummaryReport from '@screens/SummaryReports/CollectionSummaryReport'

import { HomeDrawerParamList } from './types'

const Drawer = createDrawerNavigator<HomeDrawerParamList>()

const HomeRoute: FC = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ drawerType: 'front' }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Group>
          <Drawer.Screen name="ExpenseReport" component={ExpenseReport} />
          <Drawer.Screen
            name="SalesAndIncomeReport"
            component={SalesAndIncomeReport}
          />
          <Drawer.Screen
            name="CollectionSummaryReport"
            component={CollectionSummaryReport}
          />
        </Drawer.Group>
      </Drawer.Navigator>
    </>
  )
}

export default HomeRoute
