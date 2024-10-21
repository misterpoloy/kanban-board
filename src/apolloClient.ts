import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Configure the HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8080/graphql/',
});

// Set the Authorization header using the JWT token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Assuming token is saved in localStorage

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
