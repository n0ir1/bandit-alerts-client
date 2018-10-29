import React from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import Alert from "../components/Alert";

const DONATION_ALERTS_SUBSCRIPTION = gql`
  subscription NewDonationAlert($id: ID!) {
    newDonationAlert(id: $id) {
      username
      amount
      text
    }
  }
`;

export default class Alerts extends React.Component {
  static getInitialProps(props) {
    return { id: props.query.id };
  }

  render() {
    const { id } = this.props;
    return (
      <Subscription
        subscription={DONATION_ALERTS_SUBSCRIPTION}
        variables={{ id }}
      >
        {({ data, loading, error }) => {
          if (loading) return "";
          if (error) return `Error! ${error.message}`;
          return <Alert {...data.newDonationAlert} />;
        }}
      </Subscription>
    );
  }
}
