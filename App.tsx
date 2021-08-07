import React from 'react'
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import EStyleSheet from 'react-native-extended-stylesheet'
import appTheme from './appTheme'

import { ApolloProvider } from '@apollo/client'

EStyleSheet.build({
  ...appTheme.colors,
  ...appTheme.spacings,
  ...appTheme.fontSizes,
  ...appTheme.dimensions,
})

import EntryRoute from './src/routes/EntryRoute'

import type { FC } from 'react'

import initApolloClient from './client'

const App: FC = () => {
  return (
    <ApolloProvider client={initApolloClient()}>
      <NavigationContainer>
        <EntryRoute />
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
