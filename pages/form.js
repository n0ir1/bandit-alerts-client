import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DONATION_ALERTS_SEND = gql`
  mutation DonationAlertsSend(
    $id: ID!
    $username: String
    $amount: Int
    $text: String
  ) {
    donationAlertsSend(
      id: $id
      username: $username
      amount: $amount
      text: $text
    ) {
      id
      username
      amount
      text
    }
  }
`;

export default class Form extends React.Component {
  static getInitialProps(props) {
    const { id } = props.query;
    return { id };
  }
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      username: "",
      amount: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.reset();
  };

  reset() {
    this.setState({
      text: "",
      username: "",
      amount: ""
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Mutation mutation={DONATION_ALERTS_SEND}>
        {(donationAlertSend, { data, error }) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                this.reset();
                donationAlertSend({
                  variables: {
                    id: this.props.id,
                    username: this.state.username,
                    amount: parseInt(this.state.amount),
                    text: this.state.text
                  }
                });
              }}
            >
              <input
                type="text"
                placeholder="Username"
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="Amount"
                onChange={this.handleChange}
                name="amount"
                value={this.state.amount}
                autoComplete="off"
              />
              <textarea
                onChange={this.handleChange}
                name="text"
                value={this.state.text}
              />
              <input type="submit" value="submit" />
            </form>
          );
        }}
      </Mutation>
    );
  }
}
