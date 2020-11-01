import styled, { keyframes } from 'styled-components';

interface LabelProps {
  colorBg: string;
}

interface CloseModal {
  isOpen: boolean;
}

export const ContainerMyOrders = styled.div`
  padding: 0 10vw;
  max-width: 100vw;
`;

export const Title = styled.h1``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 200px;
  position: absolute;
  width: 80%;
`;

export const HeaderTable = styled.div`
  display: flex;
  flex-direction: row;
  ul {
    list-style: none;
    display: inline-flex;
    border-bottom: 1px silver solid;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 50px;

    &:first-child {
      padding: 0 30px;
    }
    li + li {
      margin: 0 100px;
    }
  }
`;

export const Card = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 5px 0px rgb(173 173 173 / 43%);
  height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

export const ColumnTable = styled.div`
  padding: 30px;

  & + & {
    margin-left: 20px;
  }

  button {
    padding: 5px;
    background: #61a1d0;
    border-radius: 10px;
    border: transparent;
    width: 200px;
    color: white;
    margin-left: 100%;
    transition: 1s;

    svg {
      margin-right: 10px;
    }
  }

  button:hover {
    background: #315a77;
  }
`;

export const LabelSpan = styled.div<LabelProps>`
  background: ${props => props.colorBg};
  padding: 5px;
  font-size: 14px;

  color: white;

  border-radius: 10px;
`;

export const Modal = styled.div<CloseModal>`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  transition: 1s;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const animatetop = keyframes`
 
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
  
`;
export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${animatetop} 0.7s;
`;

export const Close = styled.div`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: 0.7s;

  &:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;
