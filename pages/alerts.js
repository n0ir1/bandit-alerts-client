import React from "react";
import { DonationAlertsWithData } from "../components/DonationAlerts";

export default class Alerts extends React.Component {
  static getInitialProps(props) {
    const { id } = props.query;
    return { id };
  }

  render() {
    return <DonationAlertsWithData id={this.props.id} />;
  }
}
