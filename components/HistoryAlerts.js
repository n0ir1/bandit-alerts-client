import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { format } from "date-fns";
import styled from "styled-components";

const FETCH_USER_BY_ID = gql`
  query User($id: ID) {
    user(id: $id) {
      username
    }
  }
`;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Wrap = styled.div`
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 24px;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

const RowProps = props => `
  outline: none;
  vertical-align: middle;
`;

const CellProps = props => `
    padding: 4px 56px 4px 24px;
    text-align: left;
    border-bottom: 1px solid rgba(224, 224, 224, 1);

    &:first-child {
      width: 100px;
    }

    &:last-child {
      padding-right: 24px;
      text-align: center;
    }
`;

const HeadRow = styled.tr`
  ${RowProps}
  height: 56px;
`;

const HeadCell = styled.th`
  ${CellProps}
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background-color: #000;
`;

const BodyRow = styled.tr`
  ${RowProps}
  height: 48px;

  &:nth-of-type(odd) {
    background-color: #fafafa;
  }
`;

const BodyCell = styled.td`
  ${CellProps}
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-weight: 400;
`;

export default class HistoryAlerts extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewAlerts();
  }

  render() {
    if (!this.props.data.alerts.length) {
      return "Тут ничего нет";
    }
    return (
      <Container>
        <Wrap>
          <Table>
            <thead>
              <HeadRow>
                <HeadCell>№ п/п</HeadCell>
                <HeadCell>Отправитель</HeadCell>
                <HeadCell>Сумма</HeadCell>
                <HeadCell>Текст</HeadCell>
                <HeadCell>Дата</HeadCell>
              </HeadRow>
            </thead>
            <tbody>
              {this.props.data.alerts.map((alert, i) => {
                return (
                  <BodyRow key={alert.id}>
                    <BodyCell>{i + 1}</BodyCell>
                    <BodyCell>
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
                    </BodyCell>
                    <BodyCell>{`${alert.amount} ₽`}</BodyCell>
                    <BodyCell>{alert.text}</BodyCell>
                    <BodyCell>
                      {format(
                        new Date(+alert.createdAt),
                        "DD.MM.YYYY HH:mm:ss"
                      )}
                    </BodyCell>
                  </BodyRow>
                );
              })}
            </tbody>
          </Table>
        </Wrap>
      </Container>
    );
  }
}
