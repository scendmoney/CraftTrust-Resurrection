import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { ApolloClient, from, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { concatPagination } from '@apollo/client/utilities';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/link-error';
import { createUploadLink } from 'apollo-upload-client';
import { merge } from 'lodash';
import isEqual from 'lodash/isEqual';
import Router from 'next/router';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const tokenErrors = ['NoAccess', 'UserBlocked', 'InvalidIssuer', 'InvalidToken'];
let tokenExist = true;

export const wsClient =
  typeof window !== 'undefined'
    ? new SubscriptionClient(process.env.NEXT_PUBLIC_ENV_SUBSCRIPTION_URL, {
        reconnect: true,
        lazy: true,
        connectionParams: () => {
          const token = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : undefined;
          return {
            authorization: token || token !== '' ? `${token}` : ''
          };
        }
      })
    : null;

function createApolloClient() {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(async ({ message }) => {
        if (tokenErrors.includes(message)) {
          if (tokenExist) {
            tokenExist = false;

            if (message === 'UserBlocked') {
              localStorage.removeItem('TOKEN');
              toast.error('You are blocked', { toastId: 'logout' });
              errorRedirect();
              return;
            }

            // Do not show an error on the home page
            if (message === 'NoAccess' && Router.pathname === '/') {
              return;
            }

            // We only show an error with the status NoAccess
            if (message === 'NoAccess') {
              toast.error('You do not have access to the content on this page', {
                toastId: 'logout'
              });
              return;
            }

            localStorage.removeItem('TOKEN');
            toast('You are logged out', { toastId: 'logout' });
            errorRedirect();
          }
        }
      });
    }
  });

  const link = createUploadLink({
    uri: process.env.NEXT_PUBLIC_ENV_GRAPHQL_URL
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    tokenExist = true;

    const token = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : undefined;
    // return the headers to the context so httpLink can read them

    return {
      headers: {
        'Apollo-Require-Preflight': true,
        ...headers,
        authorization: token || token !== '' ? `${token}` : ''
      }
    };
  });

  const wsLink = typeof window !== 'undefined' ? new WebSocketLink(wsClient) : null;

  const splitLink =
    typeof window !== 'undefined'
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            );
          },
          wsLink,
          authLink.concat(link)
        )
      : authLink.concat(link);

  return new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination()
          }
        },
        SearchViewModel: {
          keyFields: ['type', 'postId', 'projectId', 'userId']
        }
      }
    })
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

function errorRedirect() {
  Router.push({
    pathname: '/auth',
    query: {
      session: 'expired'
    }
  });

  return;
}
