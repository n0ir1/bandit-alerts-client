import { split, ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import fetch from "isomorphic-unfetch";
import * as jwt from "jsonwebtoken";
import { getRefreshToken, setTokens, removeTokens } from "../auth";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const GQL_URL = "http://localhost:8080/graphql";

const WSGQL_URL = "ws://localhost:8080/graphql";

const REFRESH_TOKEN = gql`
  query Tokens($refreshToken: String!) {
    tokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const httpLink = new HttpLink({
  uri: GQL_URL,
  credentials: "same-origin"
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: WSGQL_URL,
      options: {
        reconnect: true
      }
    })
  : null;

const link = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    )
  : httpLink;

function create(initialState, { getToken }) {
  const middlewareLink = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext({
      headers: { authorization: token ? `Bearer ${token}` : "" }
    });
    return forward(operation);
  });
  const httpLinkWithAuthToken = middlewareLink.concat(link);

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  const accessToken = options.getToken();
  const refreshToken = getRefreshToken();

  if (accessToken) {
    const expUnix = jwt.decode(accessToken).exp * 1000;
    const nowUnix = new Date().getTime();
    const tokenIsValid = expUnix - nowUnix > 0;

    if (!tokenIsValid) {
      apolloClient
        .query({
          query: REFRESH_TOKEN,
          variables: {
            refreshToken
          }
        })
        .then(({ data }) => {
          setTokens(data.tokens);
        })
        .catch(e => {
          console.log(e.message);
          removeTokens();
        });
    }
  }

  return apolloClient;
}
