import React, { useState } from 'react'
import { View, Image } from 'react-native'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'

import type { FC } from 'react'

import Home from '@screens/Home'
import ExpenseReport from '@screens/SummaryReports/ExpenseReport'
import SalesAndIncomeReport from '@screens/SummaryReports/SalesAndIncomeReport'
import CollectionSummaryReport from '@screens/SummaryReports/CollectionSummaryReport'

import { HomeDrawerParamList } from './types'
import { Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const Drawer = createDrawerNavigator<HomeDrawerParamList>()

import mdrxLogo from '@images/mdrx-logo.png'

const HomeRoute: FC = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ drawerType: 'front' }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="ExpenseReport" component={ExpenseReport} />
        <Drawer.Screen
          name="SalesAndIncomeReport"
          component={SalesAndIncomeReport}
        />
        <Drawer.Screen
          name="CollectionSummaryReport"
          component={CollectionSummaryReport}
        />
      </Drawer.Navigator>
    </>
  )
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const { navigation } = props

  return (
    <DrawerContentScrollView {...props}>
      <Image source={mdrxLogo} style={styles.logo} />
      <DrawerItem
        focused={selectedIndex === 0}
        label="Home"
        onPress={() => {
          setSelectedIndex(0)
          navigation.navigate('Home')
        }}
      />
      <Text style={styles.drawerSectionHeader}>SUMMARY REPORTS</Text>
      <View style={styles.drawerSectionContainer}>
        <DrawerItem
          focused={selectedIndex === 1}
          label="Expense"
          onPress={() => {
            setSelectedIndex(1)
            navigation.navigate('ExpenseReport')
          }}
        />
        <DrawerItem
          focused={selectedIndex === 2}
          label="Sales and Income"
          onPress={() => {
            setSelectedIndex(2)
            navigation.navigate('SalesAndIncomeReport')
          }}
        />
        <DrawerItem
          focused={selectedIndex === 3}
          label="Collection"
          onPress={() => {
            setSelectedIndex(3)
            navigation.navigate('CollectionSummaryReport')
          }}
        />
      </View>
      <DrawerItem label="Logout" onPress={() => navigation.goBack()} />
    </DrawerContentScrollView>
  )
}

const styles = EStyleSheet.create({
  logo: {
    height: 50,
    width: '100%',
    resizeMode: 'contain',
    marginVertical: '$spacingMd',
  },
  drawerSectionHeader: {
    fontSize: '$xs',
    marginTop: '$spacingXs',
    paddingHorizontal: '$spacingSm',
    fontWeight: 'bold',
    color: '$darkGray',
  },
  drawerSectionContainer: {
    paddingHorizontal: '$spacingXs',
  },
})

export default HomeRoute
