import '../styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { SUBGRAPH_URL } from '../utils/constant'

const client = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
