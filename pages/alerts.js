import React from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import Alert from "../components/Alert";
import { withAuth } from "../components/withAuth";

const DONATION_ALERTS_SUBSCRIPTION = gql`
  subscription NewDonationAlert($id: ID!) {
    newDonationAlert(id: $id) {
      donatorId
      amount
      text
    }
  }
`;

const Alerts = ({ user: { userId } }) => (
  <Subscription
    subscription={DONATION_ALERTS_SUBSCRIPTION}
    variables={{ id: userId }}
  >
    {({ data, loading, error }) => {
      if (loading) return null;
      if (error) return error;
      return <Alert {...data.newDonationAlert} />;
    }}
  </Subscription>
);

export default withAuth(Alerts);
