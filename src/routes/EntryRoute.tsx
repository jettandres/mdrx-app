import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type { FC } from 'react'

import Home from '@screens/Home'
import ReviewReport from '@screens/ReviewReport'
import { RootStackParamList } from '@routes/types'

const EntryRoute: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ReviewReport" component={ReviewReport} />
    </Stack.Navigator>
  )
}

export default EntryRoute
