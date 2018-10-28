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
  constructor(props) {
    super(props);

    this.state = {
      lang: "ru-RU",
      sName: "Google русский",
      rate: 0.8,
      pitch: 1,
      volume: 2
    };
  }
  componentDidMount() {
    this.synth = window.speechSynthesis;
  }
  componentWillUnmount() {
    this.synth.cancel();
  }
  speak(text) {
    const utterThis = new SpeechSynthesisUtterance();
    utterThis.text = text;
    utterThis.lang = this.state.lang;
    utterThis.rate = this.state.rate;
    utterThis.pitch = this.state.pitch;
    utterThis.volume = this.state.volume;

    this.synth.speak(utterThis);
  }
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

          this.speak(text);
          return <div>{text}</div>;
        }}
      </Subscription>
    );
  }
}
