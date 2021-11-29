import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Amplify from 'aws-amplify'

import EStyleSheet from 'react-native-extended-stylesheet'
import appTheme from './appTheme'

import { ApolloProvider } from '@apollo/client'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-2',
    userPoolId: 'us-east-2_Iy0BSewX6',
    identityPoolId: 'us-east-2:75efa0c2-af07-412b-8dcb-b654ab7ec9ce',
    userPoolWebClientId: '3319p5d89bdri6mhf5k6o3q1l4',
  },
  Storage: {
    AWSS3: {
      region: 'us-east-2',
      bucket: 'prod-mdrx-sst-storage-uploadsbucketc4b27cc7-1x13z9ge6o5pa',
    },
  },
  Analytics: {
    disabled: true,
  },
})

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
