import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const FETCH_USER_BY_ID = gql`
  query($id: ID) {
    user(id: $id) {
      username
    }
  }
`;

export default class HistoryAlerts extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewAlerts();
  }

  render() {
    if (!this.props.data.alerts.length) {
      return "Тут ничего нет";
    }
    return (
      <table>
        <tbody>
          {this.props.data.alerts.map(alert => {
            return (
              <tr key={alert.id}>
                <td>
                  <Query
                    query={FETCH_USER_BY_ID}
                    variables={{ id: alert.donatorId }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return null;
                      if (error || !data.user) return "Anonymous";

                      return data.user.username;
                    }}
                  </Query>
                </td>
                <td>{alert.amount}</td>
                <td>{alert.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
