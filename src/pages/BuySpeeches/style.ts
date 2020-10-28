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
`;

export const Speeches = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemList = styled.div`
  width: 100%;
  margin: 15px;

  height: 130px;
  left: 141px;
  top: 300px;

  background: #ffffff;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin-top: 32px;
    margin-left: 16px;
  }

  h3 {
    color: green;
    margin-left: 16px;
    margin-top: 8px;
  }

  > svg {
    margin-left: auto;
    margin-right: 42px;
    margin-top: 40px;
    cursor: pointer;
  }
`;

export const AddToCartButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 32px;
  transition: 0.7s;

  div {
    display: flex;
    flex-direction: row;
  }

  button {
    margin: 15px;
    height: 30px;
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
    position: inherit;
  }

  a {
    margin: 15px;
    height: 30px;
    font-size: 12px;
    text-decoration: none;
    color: #3f51b5;
  }

  svg {
    margin-right: 16px;
    width: 16px;
    height: 16px;
    color: #3f51b5;
  }
`;
