import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import cookies from "js-cookie";

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
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

const Profile = ({ username }) => (
  <>
    <div>{username}</div>
    <button
      onClick={() => {
        cookies.remove("token");
        location.reload();
      }}
    >
      Logout
    </button>
  </>
);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  reset = () => {
    this.setState({
      username: "",
      password: ""
    });
  };

  signup = () => {
    const { username, password } = this.state;
    this.props.client
      .mutate({
        mutation: SIGN_UP,
        variables: { username, password }
      })
      .then(data => {
        const { token } = data.data.signup;
        cookies.set("token", token);
        location.reload();
        this.reset();
      });
  };

  login = () => {
    const { username, password } = this.state;
    this.props.client
      .query({
        query: LOGIN,
        variables: { username, password }
      })
      .then(data => {
        const { token } = data.data.login;
        cookies.set("token", token);
        location.reload();
      });
  };

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    if (!user) {
      return (
        <div>
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            autoFocus={true}
            onChange={e => this.setState({ username: e.target.value })}
            value={username}
          />
          <input
            type="password"
            autoComplete="off"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
            value={password}
          />
          <button onClick={this.signup}>Signup</button>
          <button onClick={this.login}>Login</button>
        </div>
      );
    } else {
      return <Profile username={user.username} />;
    }
  }
}

export default withApollo(Login);
