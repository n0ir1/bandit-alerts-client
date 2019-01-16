const isProduction = process.env.NODE_ENV === "production";

const devConfig = {
  gqlUrl: "http://localhost:8080/graphql",
  wsUrl: "ws://localhost:8080/graphql"
};

const config = {
  gqlUrl: `http://${process.env.HOST_NAME}:8080/graphql`,
  wsUrl: `ws://${process.env.HOST_NAME}:8080/graphql`
};

const conf = isProduction ? config : devConfig;

export default conf;
