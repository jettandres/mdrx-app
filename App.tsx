import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Amplify from 'aws-amplify'

import EStyleSheet from 'react-native-extended-stylesheet'
import appTheme from './appTheme'

import { ApolloProvider } from '@apollo/client'

import codePush, { CodePushOptions } from 'react-native-code-push'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-2',
    userPoolId: 'us-east-2_US3vdbubx',
    identityPoolId: 'us-east-2:d4083231-4208-455e-805b-3ea69381f31c',
    userPoolWebClientId: '6d7cn2cc1d8vv9jvq8h2npk137',
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  Storage: {
    AWSS3: {
      region: 'us-east-2',
      bucket: 'prod-mdrx-sst-storage-uploadsbucketc4b27cc7-zqrj85rjsjxa',
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

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
}

const codePushifiedApp = codePush(codePushOptions)(App)

export default codePushifiedApp
