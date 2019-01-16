const isProduction = process.env.NODE_ENV === "production";
const url = "68.183.218.185";

const devConfig = {
  gqlUrl: "http://localhost:8080/graphql",
  wsUrl: "ws://localhost:8080/graphql"
};

const config = {
  gqlUrl: `http://${url}:8080/graphql`,
  wsUrl: `ws://${url}:8080/graphql`
};

const conf = isProduction ? config : devConfig;

export default conf;
