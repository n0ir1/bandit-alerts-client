import React from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

const DONATION_ALERTS_SUBSCRIPTION = gql`
  subscription NewDonationAlert($id: ID!) {
    newDonationAlert(id: $id) {
      username
      amount
      text
    }
  }
`;

export default class DonationAlerts extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Subscription
        subscription={DONATION_ALERTS_SUBSCRIPTION}
        variables={{ id }}
      >
        {({ data, loading, error }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { username, amount, text } = data.newDonationAlert;
          return <div>{`${username}: ${amount} ${text}`}</div>;
        }}
      </Subscription>
    );
  }
}
