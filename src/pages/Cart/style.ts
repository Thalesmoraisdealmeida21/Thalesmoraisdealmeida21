import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  @media (max-width: 400px) {
    margin: auto 0vw;
  }

  @media (max-width: 800px) {
    margin: auto 5vw;

    h2 {
      font-size: 16px;
      text-align: left;
    }
  }

  h1 {
    padding: 50px;
    font-size: 48px;
  }

  button {
    height: 60px;
    background: #4d96cb;
    padding: 10px;
    margin-left: 100px;
    border: transparent;
    width: 220px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;

    border-radius: 10px;

    @media (max-width: 800px) {
      height: 40px;
      margin-right: 30px;
    }
  }
`;

export const ItemCart = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  margin-top: 0;
  border-bottom: 1px solid silver;
  text-align: center;
  padding: 5px;

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
  width: 100%;

  div {
    margin-left: auto;
    margin-bottom: 32px;
    display: flex;
    flex-direction: row;
    strong {
      margin-left: 15px;
      font-size: 24px;
    }

    span {
      font-size: 24px;
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

export const DataCart = styled.div`
  margin-left: auto;
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0 auto;
    button {
      margin-left: 20px;
    }

    strong {
      font-size: 20px;
    }
  }
`;
