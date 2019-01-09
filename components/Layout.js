import styled from "styled-components";

import Header from "./Header";

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
