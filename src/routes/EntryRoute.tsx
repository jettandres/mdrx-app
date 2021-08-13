import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type { FC } from 'react'

import Home from '@screens/Home'
import ReviewReport from '@screens/ReviewReport'
import Login from '@screens/Login'

import { RootStackParamList } from '@routes/types'

const EntryRoute: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Home"
        options={{ title: 'Welcome, Johnny' }}
        component={Home}
      />
      <Stack.Screen
        name="ReviewReport"
        options={{ title: 'Review Report' }}
        component={ReviewReport}
      />
    </Stack.Navigator>
  )
}

export default EntryRoute
