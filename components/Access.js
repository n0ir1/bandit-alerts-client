import gql from "graphql-tag";
import Link from "next/link";
import { Query } from "react-apollo";

const FETCH_USER = gql`
  query {
    user {
      userId
    }
  }
`;

export default ({ children }) => (
  <Query query={FETCH_USER} ssr={false}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;

      return children(data.user);
    }}
  </Query>
);
