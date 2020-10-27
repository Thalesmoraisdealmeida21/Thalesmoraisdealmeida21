import styled from 'styled-components';

export const ContainerOrders = styled.div`
  display: flex;
`;

export const ListContainer = styled.div`
  margin-top: 200px;
  display: flex;
  padding: 0 20vw;
  width: 100%;
  flex-direction: column;
  position: relative;
`;

export const Order = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffff;
  width: 100%;
  border-radius: 30px;
  margin: 10px 0;

  strong {
    margin: 25px;

    span {
      background: orange;
      font-size: 12px;
      padding: 5px;
      border-radius: 15px;
    }
  }

  div {
    margin: 25px;
  }
`;
