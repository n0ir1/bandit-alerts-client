import React from "react";

export default class Table extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewAlerts();
  }

  render() {
    return (
      <table>
        <tbody>
          {!this.props.loading &&
            this.props.data.alerts &&
            this.props.data.alerts.map(alert => {
              return (
                <tr key={alert.id}>
                  <td>{alert.username}</td>
                  <td>{alert.amount}</td>
                  <td>{alert.text}</td>
                </tr>
              );
            })}
          {this.props.error && null}
        </tbody>
      </table>
    );
  }
}
