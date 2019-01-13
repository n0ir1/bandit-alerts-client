import styled from "styled-components";
import Link from "next/link";
import Access from "../components/Access";

const CardGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardLink = styled.a`
  max-width: 250px;
  margin: 0 20px;
  height: 100%;
  max-height: 350px;
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  align-items: center;
  border-radius: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
`;

const CardImg = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: grayscale(20%) blur(3px) saturate(0.44);
  background-image: url(${({ src }) => src});
`;

const CardTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.black};
  font-weight: 800;
  position: relative;
`;

const Index = () => (
  <CardGroup>
    <Link href="/form" passHref>
      <CardLink>
        <CardImg
          src={
            "https://sbankami.ru/wp-content/uploads/2017/03/perevod-deneg.jpg"
          }
        />
        <CardTitle>Form Page</CardTitle>
      </CardLink>
    </Link>
    <Access>
      <>
        <Link href="/alerts" passHref>
          <CardLink>
            <CardImg
              src={
                "https://st2.depositphotos.com/2673929/6108/i/450/depositphotos_61087739-stock-photo-businessman-and-falling-euro-bills.jpg"
              }
            />
            <CardTitle>Alerts Page</CardTitle>
          </CardLink>
        </Link>
        <Link href="/history" passHref>
          <CardLink>
            <CardImg
              src={
                "https://rarita.ru/upload/resize_cache/iblock/e9d/444_460_1768d90b5317fd8a6b77fbc5c0034fff8/0924024841_13y3571.jpg"
              }
            />
            <CardTitle>History Page</CardTitle>
          </CardLink>
        </Link>
      </>
    </Access>
  </CardGroup>
);

export default Index;
