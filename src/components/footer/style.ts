import styled, { css } from 'styled-components';

interface DropdownProps {
  showDrop: boolean;
}

export const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 50vh;

  p {
    text-align: center;
    padding: 25px;
    color: #fdfdfd;
  }

  button {
    text-decoration: none;
    background: #4d96ca;
    margin-top: 0px;
    padding: 18px;
    width: 100%;
    border-radius: 15px;
    box-shadow: 2px 1px 4px 1px black;
    color: white;
  }
`;

export const ContainerInput = styled.div`
  padding: 15px;
  background: white;
  color: #fbfbfb;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid silver;
  width: 100%;

  input {
    border: transparent;
  }
  a {
    margin-left: 50px;
  }
  svg {
    color: #6da8d2;
    transition: 1s;

    &:hover {
      color: #0066af;
    }
  }
`;

export const BoxAnswer = styled.div`
  background: #4d96ca;
  height: 150px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  display: flex;
  border-radius: 15px;

  box-shadow: 1px 1px 3px;
`;

export const MessageBox = styled.div`
  background: #fff;
  margin-top: auto;
  padding: 15px;
  flex: 1;
  border: 1px silver solid;
  border-radius: 0 0 15px 15px;
`;

export const Close = styled.div`
  svg {
    background: #4d96ca;
    border-radius: 50%;
    color: white;
    border: 1px solid silver;
    margin-left: 90%;

    cursor: pointer;
  }
`;

export const TellWhats = styled.div<DropdownProps>`
  margin-left: 70vw;
  width: 300px;
  display: block;
  overflow: hidden;

  button {
    position: fixed;
    margin-top: ${props => (props.showDrop ? '260px' : '10px')};
    width: 300px;

    transition: 1s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const CollapseDiv = styled.div<DropdownProps>`
  display: block;
  transition: 1s;
  height: ${props => (props.showDrop ? '0px' : '250px')};
  visibility: ${props => (props.showDrop ? 'hidden' : 'visible')};
`;
