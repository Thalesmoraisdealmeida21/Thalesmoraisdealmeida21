import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  h1 {
    padding: 50px;
    font-size: 48px;
  }

  button {
    height: 60px;
    background: #4d96cb;
    padding: 10px;
    margin-top: 24px;
    border: transparent;
    width: 220px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 84%;
    border-radius: 10px;
  }
`;

export const ItemCart = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
  margin-top: 0;
  border-bottom: 1px solid silver;
  text-align: center;
  padding: 30px;

  > h2 + h2 {
    margin-left: auto;
  }

  svg {
    margin-left: 30px;
    cursor: pointer;
  }
`;

export const CardCart = styled.div`
  background: white;
  margin-top: 150px;
  padding: 30px;

  div {
    margin-left: auto;
    margin-bottom: 32px;
    strong {
      margin-left: 85%;
      font-size: 32px;
    }

    span {
      font-size: 32px;
      color: green;
      margin-bottom: 32px;
    }
  }
`;

export const HeaderItemsCart = styled.div`
  color: #989898f8;
  font-weight: 600;
  margin: 16px;
  span {
    margin-left: 40px;
  }
  span + span {
    margin-left: 58%;
  }
`;
