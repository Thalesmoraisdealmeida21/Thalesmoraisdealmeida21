import styled from 'styled-components';

export const Container = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  border: transparent;
  background: #4d96ca;
  box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.25);
  transition: 0.5s;
  color: white;

  &:active {
    opacity: 0.5;
    color: black;
  }
`;
