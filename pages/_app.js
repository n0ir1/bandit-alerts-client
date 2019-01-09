import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import Layout from "../components/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider
            theme={{
              black: "#000000",
              blue: "#1976d2",
              red: "#f44245"
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
