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
      userId: Yup.string()
        .nullable(false)
        .typeError("User not found"),
      text: Yup.string()
        .required("This field is required")
        .max(200, "Text must be at most 200 characters"),
      username: Yup.string().required("This field is required"),
      amount: Yup.number()
        .typeError("Value is not a number or is less than 1")
        .required("This field is required")
        .min(1, "Value is not a number or is less than 1")
    })}
    onSubmit={(values, { resetForm, isValid }) => {
      if (isValid) {
        resetForm(false);
      }
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
                    handleSubmit(e);
                    if (isValid && !isSubmitting) {
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
                            setFieldValue("userId", null);
                          }
                        }}
                        error={
                          (errors.username && touched.username) || errors.userId
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
                  {errors.userId && <ErrorMessage message={errors.userId} />}
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
                    maxlength={200}
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
