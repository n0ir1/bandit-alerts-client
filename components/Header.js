import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import Button from "./Button";
import AuthForm from "./AuthForm";

import { removeTokens } from "../auth";

const FETCH_USER = gql`
  query User {
    user {
      username
    }
  }
`;

const Box = styled.div`
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  height: 75px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Left = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.black};
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;
`;

const Title = styled.div`
  margin-left: 15px;
  font-size: 15px;
  font-weight: 700;
`;

const Logo = styled.img`
  display: flex;
  width: 35px;
  height: 35px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-right: 15px;
`;

const Header = () => (
  <Box>
    <Container>
      <Link href="/" passHref>
        <Left>
          <Logo src="https://avatars2.githubusercontent.com/u/39315929?s=200&v=4" />
          <Title>BDA</Title>
        </Left>
      </Link>
      <Right>
        <Query query={FETCH_USER}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error || !data.user) {
              return <AuthForm />;
            }

            return (
              <User>
                <Username>{data.user.username}</Username>
                <Button label="Logout" onClick={removeTokens} />
              </User>
            );
          }}
        </Query>
      </Right>
    </Container>
  </Box>
);

export default Header;
