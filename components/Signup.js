import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { setToken } from "../auth";

const SIGN_UP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

export const Signup = ({ username, password }) => (
  <Mutation
    mutation={SIGN_UP}
    onCompleted={data => setToken(data.signup.token)}
  >
    {signup => (
      <button onClick={() => signup({ variables: { username, password } })}>
        Signup
      </button>
    )}
  </Mutation>
);
