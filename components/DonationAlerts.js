import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const DONATION_ALERTS_QUERY = gql`
  query DonationAlert($id: ID!) {
    donationAlert(id: $id) {
      id
      username
      amount
      text
    }
  }
`;

const DONATION_ALERTS_SUBSCRIPTION = gql`
  subscription {
    newDonationAlert {
      id
      username
      amount
      text
    }
  }
`;

export const DonationAlertsWithData = ({ id }) => (
  <Query query={DONATION_ALERTS_QUERY} variables={{ id }}>
    {({ subscribeToMore, ...result }) => {
      return (
        <DonationAlerts
          {...result}
          subscribeToNewDonationAlerts={() =>
            subscribeToMore({
              document: DONATION_ALERTS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev.donationAlert;
                const newDonationAlert = subscriptionData.data.newDonationAlert;
                return newDonationAlert;
              }
            })
          }
        />
      );
    }}
  </Query>
);

export default class DonationAlerts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.subscribeToNewDonationAlerts();
  }

  render() {
    if (this.props.data.donationAlert) {
      const { username, text, amount } = this.props.data.donationAlert;
      return <div>{`${username} ${text} ${amount}`}</div>;
    }
    return <div>Данных нет</div>;
  }
}
