import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  useReactiveVar,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import AsyncStorage from '@react-native-async-storage/async-storage'

// TODO: update migrate HASURA_SECRET
import Config from 'react-native-config'

type ClientType = ApolloClient<NormalizedCacheObject>

let apolloClient: ClientType | null = null

const LOCALHOST = Config.LOCALHOST

const createApolloCLient = (): ClientType => {
  const httpLink = new HttpLink({
    uri: `http://${LOCALHOST}:8080/v1/graphql`, // process.env.GRAPHQL_API_ENDPOINT,
    fetch,
    headers: {
      // Authorization: `Bearer ${process.env.USER_TOKEN}`,
      //'x-hasura-admin-secret': 'mBsfACIirPjmFNOsyqyD', // TODO: add env
    },
  })

  const withToken = setContext(async (req, { headers }) => {
    try {
      const token = await AsyncStorage.getItem('@token')
      return {
        ...headers,
        headers: {
          Authorization: token ? token : null,
        },
      }
    } catch (e) {
      console.log('token retrieval error', e)
    }

    return {
      ...headers,
    }
  })

  const client = new ApolloClient({
    link: withToken.concat(httpLink),
    cache: new InMemoryCache(),
  })
  return client
}

const initApolloClient = (): ClientType => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloCLient()
  }

  // Reuse apollo-client on client-side
  if (!apolloClient) {
    apolloClient = createApolloCLient()
  }
  return apolloClient
}

export default initApolloClient
