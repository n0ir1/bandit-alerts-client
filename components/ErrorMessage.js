import styled from "styled-components";

const ErrorMessage = styled.div`
  color: #f44245;
  margin: 0 8px;
  font-size: 10px;
`;

export default ({ message }) => <ErrorMessage>{message}</ErrorMessage>;
