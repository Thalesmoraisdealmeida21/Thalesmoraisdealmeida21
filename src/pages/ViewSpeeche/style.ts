import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  @media (max-width: 700px) {
    margin: auto 0vw;
    min-width: 100vw;
  }

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
    width: 100%;
    margin-top: 32px;
    margin-left: 8px;
  }

  h3 {
    color: green;
    margin-left: 16px;
    margin-top: 8px;
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
      transition: ease 0.7s;

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

export const ContainerVideo = styled.div`
  margin-top: 80px;
  align-content: center;
  text-align: center;
  width: 100vw;
  max-width: 100%;

  h2 {
    margin-top: 0;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 18px;
    }
  }
`;

export const VideoContent = styled.div`
  margin-left: auto;
  width: 100%;
`;

export const Descritpion = styled.div``;
