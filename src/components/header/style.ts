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
    margin-top: 20px;
    cursor: pointer;
  }

  > svg {
    height: 40px;
    width: 40px;

    cursor: pointer;

    @media (max-width: 900px) {
      display: none;
    }
  }

  @media (max-width: 900px) {
    margin: auto 10vw;
  }

  img {
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

export const UserLogo = styled.div`
  border: 1px solid;
  border-radius: 100%;
  background: transparent;
  border-color: transparent;
  display: flex;
  align-items: center;
  align-content: center;
`;

export const LoginContent = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 30px;

  h1 {
    font-size: 30px;
    color: white;
    text-align: center;
    font-weight: 700;
    margin-top: 4px;
  }

  @media (max-width: 900px) {
    button {
      margin-left: auto;
    }

    div {
      margin-right: auto;
    }
  }

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100vw;

    div {
      width: 200px;
    }
    button {
      margin-left: auto;
    }
  }
  a {
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
  z-index: 1;
  position: absolute;
  background: white;
  top: 60px;
  text-align: left;
  box-shadow: 3px 2px 9px 0px black;
  border-radius: 8px;
  right: 0px;
  width: 300px;
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
