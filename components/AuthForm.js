import React from "react";
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { User } from "./User";
import TextField from "./TextField";
import Button from "./Button";
import { setToken } from "../auth";

const FETCH_USER = gql`
  query {
    user {
      userId
      username
    }
  }
`;

const SIGN_UP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Row = styled.div`
  width: 300px;
`;

const ButtonWrap = styled.div`
  margin: 8px;
`;

class Auth extends React.Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    const { username, password } = this.state;
    return (
      <Query query={FETCH_USER} ssr={false}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error || !data.user)
            return (
              <>
                <Container>
                  <Row>
                    <TextField
                      type="text"
                      placeholder="Username"
                      autoComplete="off"
                      autoFocus={true}
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                      value={username}
                    />
                  </Row>
                  <Row>
                    <TextField
                      type="password"
                      autoComplete="off"
                      placeholder="Password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                      value={password}
                    />
                  </Row>
                  <Row>
                    <Mutation
                      mutation={SIGN_UP}
                      onCompleted={data => setToken(data.signup.token)}
                    >
                      {signup => (
                        <ButtonWrap>
                          <Button
                            onClick={() =>
                              signup({ variables: { username, password } })
                            }
                            label="Signup"
                            full
                          />
                        </ButtonWrap>
                      )}
                    </Mutation>
                  </Row>
                  <Row>
                    <ApolloConsumer>
                      {client => (
                        <ButtonWrap>
                          <Button
                            label="Login"
                            full
                            onClick={async () => {
                              const { data } = await client.query({
                                query: LOGIN,
                                variables: { username, password }
                              });
                              setToken(data.login.token);
                            }}
                          />
                        </ButtonWrap>
                      )}
                    </ApolloConsumer>
                  </Row>
                </Container>
              </>
            );
          return <User user={data.user} />;
        }}
      </Query>
    );
  }
}

export default Auth;
