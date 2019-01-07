import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import TextField from "../components/TextField";
import Button from "../components/Button";
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

const ButtonWrap = styled.div`
  margin: 16px 8px 8px;
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
            <ButtonWrap>
              <Button label="Send" full />
            </ButtonWrap>
          </FormContainer>
        </Container>
      );
    }}
  </Mutation>
);

export default withValidateSendForm(Form);
