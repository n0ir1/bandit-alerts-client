import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import { Formik } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import styled from "styled-components";
import TextField from "./TextField";
import Button from "./Button";
import ErrorMessage from "../components/ErrorMessage";
import { setToken } from "../auth";

const SIGN_UP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Row = styled.div`
  width: 300px;
`;

const ButtonWrap = styled.div`
  margin: 8px;
`;

const AuthForm = () => (
  <Formik
    initialValues={{
      username: "",
      password: ""
    }}
    validationSchema={Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required")
    })}
    onSubmit={(values, { resetForm }) => {
      resetForm(false);
    }}
  >
    {props => {
      const {
        values: { username, password },
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        isSubmitting,
        setFieldError,
        handleSubmit
      } = props;

      return (
        <>
          <Container>
            <Row>
              <TextField
                type="text"
                placeholder="Username"
                name="username"
                autoComplete="off"
                autoFocus={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={username}
                error={
                  errors.signup ||
                  errors.login ||
                  (errors.username && touched.username)
                }
              />
              {errors.username && touched.username && (
                <ErrorMessage message={errors.username} />
              )}
            </Row>
            <Row>
              <TextField
                type="password"
                autoComplete="off"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={password}
                error={
                  errors.signup ||
                  errors.login ||
                  (errors.password && touched.password)
                }
              />
              {errors.password && touched.password && (
                <ErrorMessage message={errors.password} />
              )}
              {errors.signup && <ErrorMessage message={errors.signup} />}
              {errors.login && <ErrorMessage message={errors.login} />}
            </Row>
            <Row>
              <Mutation
                mutation={SIGN_UP}
                onCompleted={data => setToken(data.signup.token)}
                onError={error =>
                  setFieldError("signup", "User same name already exists")
                }
              >
                {signup => (
                  <ButtonWrap>
                    <Button
                      onClick={e => {
                        if (isValid && !isSubmitting) {
                          signup({ variables: { username, password } });
                          handleSubmit(e);
                        }
                      }}
                      label="Signup"
                      full
                      disabled={!isValid}
                    />
                  </ButtonWrap>
                )}
              </Mutation>
            </Row>
            <Row>
              <ApolloConsumer>
                {client => (
                  <ButtonWrap>
                    <Button
                      label="Login"
                      full
                      disabled={!isValid}
                      onClick={async e => {
                        if (isValid && !isSubmitting) {
                          handleSubmit(e);
                          try {
                            const { data } = await client.query({
                              query: LOGIN,
                              variables: { username, password }
                            });
                            setToken(data.login.token);
                          } catch (error) {
                            setFieldError(
                              "login",
                              "Username or password is incorrect"
                            );
                          }
                        }
                      }}
                    />
                  </ButtonWrap>
                )}
              </ApolloConsumer>
            </Row>
          </Container>
        </>
      );
    }}
  </Formik>
);

export default AuthForm;
