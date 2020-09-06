import styled, { css } from 'styled-components';

interface DropdownProps {
  showDrop: boolean;
}

export const Container = styled.div`
  background: #4d96ca;
  position: fixed;
  width: 100%;
`;

export const Content = styled.div`
  margin: auto 20vw;
  display: flex;

  svg {
    margin-top: 8px;
    margin-left: 16px;
    cursor: pointer;
  }
`;

export const LoginContent = styled.div`
  margin-left: auto;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  position: relative;

  > span {
    background: black;
    width: 15px;
    color: white;
    height: 15px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    margin-top: 35px;
    position: absolute;
    left: 99%;
    right: 10%;
    margin-right: 30px;
  }

  button {
    background: transparent;
    border: transparent;
    max-height: 50px;
  }

  div {
    margin-top: 16px;
    margin-left: 8px;
    width: 100px;
    display: flex;
    flex-direction: column;

    strong {
      color: #0e4b76;
      font-weight: 600;
    }

    span {
      color: white;
      font-weight: 500;
    }
  }
  img {
    border-radius: 50%;
    max-height: 65px;
  }

  svg {
    margin-top: 16px;
    margin-left: 8px;
    & + svg {
      margin-left: 50px;
    }
  }
`;

export const DropdownContent = styled.div<DropdownProps>`
  ${props =>
    props.showDrop
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}
  position: absolute;
  background: white;
  top: 70px;
  text-align: left;
  box-shadow: 3px 2px 9px 0px black;
  border-radius: 8px;
  right: 10px;
  width: 100%;

  button {
    background: transparent;
    border: transparent;
    height: 100%;
    width: 100%;

    padding: 10px;
    &:hover {
      background: silver;
    }
  }
  ul {
    list-style: none;
  }
`;

export const MenuContent = styled.div`
  background: #4d96ca;
  width: 100%;
  display: flex;
  text-align: center;
  margin-left: 2vw;

  ul {
    list-style: none;
    margin: auto 0;
    display: flex;
    flex: 1;

    li {
      transition: 0.5s;
      margin-left: 10px;

      a {
        text-decoration: none;
        color: #fff;
        text-align: center;
      }

      &:hover {
        background: #2870a3;
        padding: 10px;
      }

      &:active {
        background: #2870a3;
        padding: 10px;
      }
    }
  }
`;
