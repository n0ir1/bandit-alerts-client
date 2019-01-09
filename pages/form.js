import React from "react";
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import * as uuid from "uuid";
import TextField from "../components/TextField";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

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
  margin: 16px 0px 8px;
`;

const FETCH_USER = gql`
  query User {
    user {
      userId
    }
  }
`;

const FETCH_USER_BY_NAME = gql`
  query User($name: String) {
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

const Form = ({ user }) => (
  <Formik
    initialValues={{
      text: "",
      userId: null,
      username: "",
      amount: ""
    }}
    validationSchema={Yup.object().shape({
      userId: Yup.string().nullable(),
      text: Yup.string().required("This field is required"),
      username: Yup.string().required("This field is required"),
      amount: Yup.number()
        .typeError("Value is not a number or is less than 1")
        .required("This field is required")
        .min(1, "Value is not a number or is less than 1")
    })}
    onSubmit={(values, { resetForm }) => {
      resetForm(false);
    }}
  >
    {props => {
      const {
        values: { username, amount, text, userId },
        touched,
        errors,
        handleChange,
        isValid,
        isSubmitting,
        setFieldError,
        setFieldValue,
        handleSubmit,
        handleBlur
      } = props;
      return (
        <Mutation mutation={DONATION_ALERTS_SEND}>
          {donationAlertSend => {
            return (
              <Container>
                <FormContainer
                  onSubmit={e => {
                    if (isValid && !isSubmitting) {
                      handleSubmit(e);
                      donationAlertSend({
                        variables: {
                          userId: userId,
                          donatorId: user ? user.userId : uuid.v4(),
                          amount: parseInt(amount),
                          text
                        }
                      });
                    }
                  }}
                >
                  <ApolloConsumer>
                    {client => (
                      <TextField
                        onChange={handleChange}
                        onBlur={async e => {
                          handleBlur(e);
                          try {
                            const { data } = await client.query({
                              query: FETCH_USER_BY_NAME,
                              variables: { name: username }
                            });
                            setFieldValue("userId", data.user.userId);
                          } catch (e) {
                            setFieldError("user", "User not found");
                          }
                        }}
                        error={
                          (errors.username && touched.username) || errors.user
                        }
                        name="username"
                        value={username}
                        autoComplete="off"
                        autoFocus
                        placeholder="Username"
                      />
                    )}
                  </ApolloConsumer>
                  {errors.username && touched.username && (
                    <ErrorMessage message={errors.username} />
                  )}
                  {errors.user && <ErrorMessage message={errors.user} />}
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="amount"
                    value={amount}
                    autoComplete="off"
                    placeholder="Amount"
                    error={errors.amount && touched.amount}
                  />
                  {errors.amount && touched.amount && (
                    <ErrorMessage message={errors.amount} />
                  )}
                  <TextField
                    multiline
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="text"
                    value={text}
                    placeholder="Text"
                    error={errors.text && touched.text}
                  />
                  {errors.text && touched.text && (
                    <ErrorMessage message={errors.text} />
                  )}
                  <ButtonWrap>
                    <Button label="Send" full disabled={!isValid} />
                  </ButtonWrap>
                </FormContainer>
              </Container>
            );
          }}
        </Mutation>
      );
    }}
  </Formik>
);

Form.getInitialProps = async ({ apolloClient }) => {
  try {
    const res = await apolloClient.query({ query: FETCH_USER });
    return {
      user: res.data.user
    };
  } catch (error) {
    return {
      user: null
    };
  }
};

export default Form;
