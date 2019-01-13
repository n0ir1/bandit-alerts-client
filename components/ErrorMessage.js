import styled from "styled-components";

const Message = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 9px;
`;

const ErrorMessage = ({ message }) => <Message>{message}</Message>;

export default ErrorMessage;
