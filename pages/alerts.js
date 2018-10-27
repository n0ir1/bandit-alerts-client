import React from "react";
import DonationAlerts from "../components/DonationAlerts";

export default class Alerts extends React.Component {
  static getInitialProps(props) {
    const { id } = props.query;
    return { id };
  }

  render() {
    return <DonationAlerts id={this.props.id} />;
  }
}
