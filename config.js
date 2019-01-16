const isProduction = process.env.NODE_ENV === "production";
const host = process.env.HOST_NAME;
console.log(host, process.env.NODE_ENV);

const devConfig = {
  gqlUrl: "http://localhost:8080/graphql",
  wsUrl: "ws://localhost:8080/graphql"
};

const config = {
  gqlUrl: `http://${host}:8080/graphql`,
  wsUrl: `ws://${host}:8080/graphql`
};

const conf = isProduction ? config : devConfig;

export default conf;
