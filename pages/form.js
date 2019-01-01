import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextField from "../components/TextField";
import styled from "styled-components";
import { withValidateSendForm } from "../components/withValidateSendForm";

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

const ErrorMessage = styled.div`
  color: #f44245;
  margin: 0 8px;
  font-size: 10px;
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

const Form = ({
  username,
  amount,
  text,
  formValid,
  userId,
  donatorId,
  errors,
  clearForm,
  handleChange,
  handleBlur
}) => (
  <Mutation mutation={DONATION_ALERTS_SEND} onCompleted={() => clearForm()}>
    {donationAlertSend => {
      return (
        <Container>
          <FormContainer
            onSubmit={e => {
              e.preventDefault();
              if (formValid) {
                donationAlertSend({
                  variables: {
                    userId,
                    donatorId,
                    amount: parseInt(amount),
                    text
                  }
                });
              }
            }}
          >
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              value={username}
              autoComplete="off"
              autoFocus
              placeholder="Username"
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
            <TextField
              onChange={handleChange}
              name="amount"
              value={amount}
              autoComplete="off"
              placeholder="Amount"
            />
            {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
            <TextField
              multiline
              onChange={handleChange}
              name="text"
              value={text}
              placeholder="Text"
            />
            {errors.text && <ErrorMessage>{errors.text}</ErrorMessage>}
            <Button>Send</Button>
          </FormContainer>
        </Container>
      );
    }}
  </Mutation>
);

export default withValidateSendForm(Form);
