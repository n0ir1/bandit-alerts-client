import React from "react";
import gql from "graphql-tag";
import Router from "next/router";
import { Subscription, Query } from "react-apollo";

import Alert from "../components/Alert";

const DONATION_ALERTS_SUBSCRIPTION = gql`
  subscription NewDonationAlert($id: ID!) {
    newDonationAlert(id: $id) {
      donatorId
      amount
      text
    }
  }
`;

const FETCH_USER = gql`
  query {
    user {
      userId
      username
    }
  }
`;

export default () => (
  <Query query={FETCH_USER} ssr={false}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) {
        Router.push("/");
        return null;
      }
      const { userId } = data.user;
      return (
        <Subscription
          subscription={DONATION_ALERTS_SUBSCRIPTION}
          variables={{ id: userId }}
        >
          {({ data, loading, error }) => {
            if (loading) return "";
            if (error) return `Error! ${error.message}`;
            return <Alert {...data.newDonationAlert} />;
          }}
        </Subscription>
      );
    }}
  </Query>
);
