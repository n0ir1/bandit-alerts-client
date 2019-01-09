import gql from "graphql-tag";
import { Query } from "react-apollo";

const FETCH_USER = gql`
  query User {
    user {
      userId
    }
  }
`;

export default ({ children }) => (
  <Query query={FETCH_USER}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;

      return children;
    }}
  </Query>
);
