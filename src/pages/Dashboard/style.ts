import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;

  @media (max-width: 650px) {
    margin: auto 5vw;

    h2 {
      font-size: 16px;
      font-weight: 400;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  position: static;

  padding: 40px 0;
  max-width: 100vw;

  h1 {
    padding: 50px;
    font-size: 48px;
    font-weight: 1000;
  }
  h2 {
    font-weight: 700;
    margin: 10px;
    margin-bottom: 8px;
  }
  p {
    margin-left: 16px;
    max-width: 600px;
    text-align: left;
    overflow: hidden;
  }
`;

export const ConfirmModal = styled.div`
  p {
    text-align: center;
    color: red;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  span {
    &:focus {
      background-color: rgb(224 220 222 / 15%);
    }
  }
`;

export const Speeches = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: white;
  }

  a:hover {
    color: black;
  }
`;

export const ItemList = styled.div`
  width: 100%;
  margin: 15px 0;

  height: 130px;
  left: 130px;
  top: 300px;

  @media (max-width: 650px) {
    height: 100px;
  }

  background: #ffffff;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
    width: 450px;
  }
  h2 {
    margin-top: 24px;
    margin-left: 16px;
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
    position: inherit;
    margin-top: 20px;

    margin-left: 16px;
    transition: 0.7s;
    color: white;

    @media (max-width: 650px) {
      margin-top: 20px;
      height: 60px;
    }
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

export const AddToCartButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 32px;
  transition: 0.7s;
  span {
    font-size: 16px;
  }

  button {
    background: transparent;
    color: black;

    &:hover {
      background: transparent;
      border: transparent;
      box-shadow: none;

      color: #939292;
    }
  }
`;

export const ExpiredContent = styled.div`
  margin-left: 0;
  color: red;
  font-weight: 400;
  font-size: 16px;
  margin-top: auto;
  margin-left: auto;
  margin-bottom: auto;
`;
