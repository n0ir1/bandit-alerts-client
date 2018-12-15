import gql from "graphql-tag";
import { Query } from "react-apollo";
import Router from "next/router";
import HistoryAlerts from "../components/HistoryAlerts";

const GET_ALERTS = gql`
  query {
    alerts {
      id
      userId
      donatorId
      amount
      text
    }
  }
`;

const NEW_DONATION_ALERT_SUBSCRIPTION = gql`
  subscription NewDonationAlert($id: ID!) {
    newDonationAlert(id: $id) {
      id
      userId
      donatorId
      amount
      text
    }
  }
`;

const History = props => (
  <Query query={GET_ALERTS} ssr={false}>
    {({ subscribeToMore, loading, error, ...result }) => {
      if (loading) return null;
      if (error) {
        Router.push("/");
        return null;
      }
      const id = props.id;
      return (
        <HistoryAlerts
          {...result}
          subscribeToNewAlerts={() =>
            subscribeToMore({
              document: NEW_DONATION_ALERT_SUBSCRIPTION,
              variables: { id },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newAlerts = subscriptionData.data.newDonationAlert;
                return {
                  alerts: [...prev.alerts, newAlerts]
                };
              }
            })
          }
        />
      );
    }}
  </Query>
);

History.getInitialProps = ctx => {
  return { id: ctx.query.id };
};

export default History;
