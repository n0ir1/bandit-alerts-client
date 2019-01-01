import React from "react";
import gql from "graphql-tag";
import redirect from "../lib/redirect";

const FETCH_USER = gql`
  query {
    user {
      userId
      username
    }
  }
`;

export const withAuth = Component => {
  return class AuthComponent extends React.Component {
    static async getInitialProps({ apolloClient, ...ctx }) {
      try {
        const res = await apolloClient.query({ query: FETCH_USER });
        return {
          user: res.data.user
        };
      } catch (error) {
        redirect(ctx, "/");
        return {
          user: null
        };
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};
