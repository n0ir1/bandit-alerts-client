import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import * as uuid from "uuid";

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

export const withValidateSendForm = Component => {
  class WrappedComponent extends React.Component {
    static async getInitialProps({ apolloClient }) {
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
    }

    state = {
      text: "",
      userId: null,
      username: "",
      amount: "",
      usernameValid: false,
      textValid: false,
      amountValid: false,
      formValid: false,
      errors: {
        username: "",
        text: "",
        amount: ""
      }
    };

    fetchUserByName = async name => {
      try {
        const { data } = await this.props.client.query({
          query: FETCH_USER_BY_NAME,
          variables: { name }
        });
        const { userId } = data.user;
        this.setState({ userId });
      } catch (error) {
        const { errors } = this.state;
        errors.username = "User not found";
        this.setState({ errors });
      }
    };

    handleBlur = e => {
      this.fetchUserByName(this.state.username);
    };

    handleChange = e => {
      const { name, value } = e.target;
      this.setState(
        {
          [name]: value
        },
        () => this.checkValidValue(name, value)
      );
    };

    isExist = value => {
      return !!value;
    };

    isNumber = n => {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    checkValidValue = (fieldName, value) => {
      const { errors } = this.state;
      let amountValid = this.state.amountValid;
      let textValid = this.state.textValid;
      let usernameValid = this.state.usernameValid;

      switch (fieldName) {
        case "username":
          usernameValid = this.isExist(value);
          errors.username = usernameValid ? "" : "This field is required";
          break;
        case "amount":
          amountValid = this.isNumber(value) && value > 0;
          errors.amount = amountValid
            ? ""
            : "Value is not a number or is less than 1";
          break;
        case "text":
          textValid = this.isExist(value);
          errors.text = textValid ? "" : "This field is required";
          break;
        default:
          break;
      }

      this.setState(
        {
          usernameValid,
          amountValid,
          textValid,
          errors
        },
        this.checkValidForm
      );
    };

    checkValidForm = () => {
      const { textValid, amountValid, usernameValid } = this.state;
      this.setState({
        formValid: textValid && amountValid && usernameValid
      });
    };

    clearForm = () => {
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

    render() {
      const { username, amount, text, formValid, userId, errors } = this.state;
      const donatorId = this.props.user ? this.props.user.userId : uuid.v4();
      return (
        <Component
          username={username}
          amount={amount}
          text={text}
          userId={userId}
          donatorId={donatorId}
          clearForm={this.clearForm}
          formValid={formValid}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
          errors={errors}
        />
      );
    }
  }
  return withApollo(WrappedComponent);
};
