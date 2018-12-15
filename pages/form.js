import React from "react";
import gql from "graphql-tag";
import { Mutation, withApollo } from "react-apollo";
import TextField from "../components/TextField";
import styled from "styled-components";
import * as uuid from "uuid";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
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

const FETCH_USER = gql`
  query {
    user {
      userId
    }
  }
`;

const FETCH_USER_BY_NAME = gql`
  query($name: String) {
    user(name: $name) {
      userId
    }
  }
`;

const DONATION_ALERTS_SEND = gql`
  mutation DonationAlertsSend(
    $userId: ID!
    $donatorId: ID!
    $amount: Int!
    $text: String!
  ) {
    donationAlertsSend(
      userId: $userId
      donatorId: $donatorId
      amount: $amount
      text: $text
    )
  }
`;

class Form extends React.Component {
  state = {
    text: "",
    donatorId: null,
    userId: null,
    username: "",
    amount: "",
    usernameValid: false,
    textValid: false,
    amountValid: false,
    formValid: false
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    try {
      const user = await this.props.client.query({
        query: FETCH_USER
      });
      const donatorId = user.data.user.userId;
      this.setState({ donatorId });
    } catch (error) {
      const donatorId = uuid.v4();
      this.setState({ donatorId });
    }
  };

  fetchUserByName = async name => {
    try {
      const user = await this.props.client.query({
        query: FETCH_USER_BY_NAME,
        variables: { name }
      });
      const userId = user.data.user.userId;
      this.setState({ userId });
    } catch (error) {
      return null;
    }
  };

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
        amountValid: this.isNumber(amount) && amount > 0,
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

  sendForm = donationAlertSend => {
    const { amount, text, formValid, userId, donatorId } = this.state;
    if (formValid) {
      donationAlertSend({
        variables: {
          userId,
          donatorId,
          amount: parseInt(amount),
          text
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
                onSubmit={e => {
                  e.preventDefault();
                  this.sendForm(donationAlertSend);
                }}
              >
                <TextField
                  onChange={this.handleChange}
                  onBlur={() => this.fetchUserByName(this.state.username)}
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

export default withApollo(Form);
