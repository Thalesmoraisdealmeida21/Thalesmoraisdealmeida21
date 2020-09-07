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
    border: transparent;
    width: 220px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 60%;
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
