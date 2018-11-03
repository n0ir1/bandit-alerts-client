import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextField from "../components/TextField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 300px;
`;

const Button = styled.button`
  color: #6c757d;
  background-color: transparent;
  background-image: none;
  border: 1px solid #6c757d;
  margin: 16px 8px 8px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  border-radius: 0.25rem;

  &:hover {
    color: #343a40;
    border: 1px solid #343a40;
  }
`;

const DONATION_ALERTS_SEND = gql`
  mutation DonationAlertsSend(
    $id: ID!
    $username: String!
    $amount: Int!
    $text: String!
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
      amount: "",
      usernameValid: false,
      textValid: false,
      amountValid: false,
      formValid: false
    };
  }

  reset = () => {
    this.setState({
      text: "",
      username: "",
      amount: "",
      usernameValid: false,
      textValid: false,
      amountValid: false,
      formValid: false
    });
  };

  isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  check = () => {
    const { amount, username, text } = this.state;
    this.setState(
      {
        usernameValid: this.isExist(username),
        amountValid: this.isNumber(amount),
        textValid: this.isExist(text)
      },
      this.validateForm
    );
  };

  isExist = field => {
    return !!field;
  };

  validateForm = () => {
    const { textValid, amountValid, usernameValid } = this.state;
    this.setState({
      formValid: textValid && amountValid && usernameValid
    });
  };

  handleSubmit = (e, donationAlertSend) => {
    e.preventDefault();
    const { username, amount, text, formValid } = this.state;

    if (formValid) {
      donationAlertSend({
        variables: {
          id: this.props.id,
          username: username,
          amount: parseInt(amount),
          text: text
        }
      });

      this.reset();
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Mutation mutation={DONATION_ALERTS_SEND}>
        {donationAlertSend => {
          return (
            <Container>
              <FormContainer
                onSubmit={e => this.handleSubmit(e, donationAlertSend)}
              >
                <TextField
                  onChange={this.handleChange}
                  name="username"
                  value={this.state.username}
                  autoComplete="off"
                  autoFocus
                  placeholder="Username"
                />
                <TextField
                  onChange={this.handleChange}
                  name="amount"
                  value={this.state.amount}
                  autoComplete="off"
                  placeholder="Amount"
                />
                <TextField
                  multiline
                  onChange={this.handleChange}
                  name="text"
                  value={this.state.text}
                  placeholder="Text"
                />
                <Button onClick={this.check}>Send</Button>
              </FormContainer>
            </Container>
          );
        }}
      </Mutation>
    );
  }
}
