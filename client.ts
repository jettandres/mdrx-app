import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client'

// TODO: update migrate HASURA_SECRET
import Config from 'react-native-config'

type ClientType = ApolloClient<NormalizedCacheObject>

let apolloClient: ClientType | null = null

const LOCALHOST = '10.0.2.2'

const createApolloCLient = (): ClientType => {
  const httpLink = new HttpLink({
    uri: `http://${LOCALHOST}:8080/v1/graphql`, // process.env.GRAPHQL_API_ENDPOINT,
    fetch,
    headers: {
      // Authorization: `Bearer ${process.env.USER_TOKEN}`,
      'x-hasura-admin-secret': 'mBsfACIirPjmFNOsyqyD', // TODO: add env
    },
  })
  const client = new ApolloClient({
    link: httpLink,
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
