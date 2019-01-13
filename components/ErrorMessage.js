import styled from "styled-components";

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 9px;
`;

export default ({ message }) => <ErrorMessage>{message}</ErrorMessage>;
