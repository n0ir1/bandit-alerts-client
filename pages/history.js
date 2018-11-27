import gql from "graphql-tag";
import { Query } from "react-apollo";
import Table from "../components/Table";

const id = "1335c669-9964-4018-ad4b-710e565c3137";

const GET_ALERTS = gql`
  query {
    alerts {
      id
      username
      amount
      text
    }
  }
`;

const NEW_DONATION_ALERT_SUBSCRIPTION = gql`
  subscription NewDonationAlert($id: ID!) {
    newDonationAlert(id: $id) {
      id
      username
      amount
      text
    }
  }
`;

const History = () => (
  <Query query={GET_ALERTS} ssr={false}>
    {({ subscribeToMore, ...result }) => (
      <Table
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
    )}
  </Query>
);

export default History;
