import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { format } from "date-fns";
import styled from "styled-components";
import { lighten, darken } from "polished";

const FETCH_USER_BY_ID = gql`
  query User($id: ID) {
    user(id: $id) {
      username
    }
  }
`;

const RowProps = props => `
  height: 55px;
  overflow: hidden;
  padding-right: 17px;
  display: grid;
  grid-template-columns: 75px 2fr 1fr 3fr 3fr;
  align-items: center;
`;

const ColProps = props => `
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 1200px;
  overflow: hidden;
  margin: 25px auto 0;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;

const HeaderRow = styled.div`
  ${RowProps}
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => lighten(0.1, theme.blue)};
`;

const HeaderCol = styled.div`
  ${ColProps}
  font-size: 12px;
  font-weight: 600;
`;

const BodyRow = styled.div`
  ${RowProps}
  border-bottom: 1px solid ${({ theme }) => lighten(0.8, theme.black)};

  &:nth-of-type(odd) {
    background-color: ${({ theme }) => lighten(0.98, theme.black)};
  }
`;

const BodyCol = styled.div`
  ${ColProps}
  font-weight: 400;
  font-size: 13px;
`;

const ErrorMessage = styled.div`
  display: flex;
  height: 100%;
  font-weight: 600;
  justify-content: center;
  align-items: center;
`;

export default class HistoryAlerts extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewAlerts();
  }

  render() {
    if (!this.props.data.alerts.length) {
      return <ErrorMessage>Alerts not found</ErrorMessage>;
    }
    return (
      <Wrap>
        <HeaderRow>
          <HeaderCol>№ п/п</HeaderCol>
          <HeaderCol>Отправитель</HeaderCol>
          <HeaderCol>Сумма</HeaderCol>
          <HeaderCol>Текст</HeaderCol>
          <HeaderCol>Дата</HeaderCol>
        </HeaderRow>
        {this.props.data.alerts.map((alert, i) => {
          return (
            <BodyRow key={alert.id}>
              <BodyCol>{i + 1}</BodyCol>
              <BodyCol>
                <Query
                  query={FETCH_USER_BY_ID}
                  variables={{ id: alert.donatorId }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error || !data.user) return "Anonymous";

                    return data.user.username;
                  }}
                </Query>
              </BodyCol>
              <BodyCol>{`${alert.amount} ₽`}</BodyCol>
              <BodyCol>{alert.text}</BodyCol>
              <BodyCol>
                {format(new Date(+alert.createdAt), "DD.MM.YYYY HH:mm:ss")}
              </BodyCol>
            </BodyRow>
          );
        })}
      </Wrap>
    );
  }
}
