import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { setToken } from "../auth";

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const Login = ({ username, password }) => (
  <ApolloConsumer>
    {client => (
      <button
        onClick={async () => {
          const { data } = await client.query({
            query: LOGIN,
            variables: { username, password }
          });
          setToken(data.login.token);
        }}
      >
        Login
      </button>
    )}
  </ApolloConsumer>
);
