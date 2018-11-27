import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import Link from "next/link";
import Login from "../components/Login";

const id = "1335c669-9964-4018-ad4b-710e565c3137";

const GET_USER = gql`
  query {
    user {
      username
    }
  }
`;

class Index extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.props.client
      .query({
        query: GET_USER
      })
      .then(({ data: user }) => this.setState({ ...user }))
      .catch(error => null);
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Login user={user} />
        <Link href={{ pathname: "/form", query: { id } }}>
          <a>Form Page</a>
        </Link>
        <Link href={{ pathname: "alerts", query: { id } }}>
          <a>Alerts Page</a>
        </Link>
        {user && (
          <Link href={{ pathname: "history", query: { id } }}>
            <a>History Page</a>
          </Link>
        )}
      </>
    );
  }
}

export default withApollo(Index);
