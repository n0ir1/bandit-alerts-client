import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { User } from "./User";
import TextField from "./TextField";
import styled from "styled-components";

const FETCH_USER = gql`
  query {
    user {
      userId
      username
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

class Auth extends React.Component {
  state = {
    username: "",
    password: ""
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
                    <Signup username={username} password={password} />
                  </Row>
                  <Row>
                    <Login username={username} password={password} />
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
