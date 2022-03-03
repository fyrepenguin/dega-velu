import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'isomorphic-unfetch';

export const client = new ApolloClient({
  uri: process.env.API_URL,
  headers: {
    'X-Dega-API-Key': `${process.env.DEGA_API_KEY}`,
    'X-Space': parseInt(process.env.SPACE_ID),
  },
  cache: new InMemoryCache(),
});
