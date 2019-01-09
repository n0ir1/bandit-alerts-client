import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const GlobalStyle = `
  * {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14px;
    box-sizing: border-box;
  }

  *:before, *:after {
    box-sizing: border-box;
  }

  html {
    overflow: hidden;
  }

  html, body, #__next {
    height: 100%;
    margin: 0;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: GlobalStyle }} />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
