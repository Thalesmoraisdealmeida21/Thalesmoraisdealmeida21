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

  h2 {
    margin-top: 42px;
    margin-left: 16px;
  }

  h3 {
    margin-top: 50px;
    margin-left: auto;
    color: green;
  }
  button {
    margin-top: auto;
    background: #4d96ca;
    height: 80px;
    border-radius: 50%;
    border: transparent;
    width: 80px;
    margin-top: 20px;

    margin-left: 16px;
    transition: 0.7s;
    color: white;

    &:hover {
      background: white;
      border: silver;
      box-shadow: 1px 1px 10px;
      color: #000;

      button + svg {
        color: #000;
      }
    }

    &:active {
      transition: ease 1s;

      background: silver;
    }
  }

  > svg {
    margin-left: auto;
    margin-right: 42px;
    margin-top: 40px;
    cursor: pointer;
  }
`;
