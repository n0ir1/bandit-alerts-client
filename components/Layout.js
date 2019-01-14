import styled from "styled-components";
import Header from "./Header";

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  height: 100%;
  flex: 1 1 auto;
  overflow: hidden auto;
`;

const Layout = ({ children }) => (
  <Wrap>
    <Header />
    <ContentWrap>{children}</ContentWrap>
  </Wrap>
);

export default Layout;
