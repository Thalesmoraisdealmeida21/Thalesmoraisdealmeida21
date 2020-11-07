import styled from 'styled-components';

export const ContainerForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  button {
    margin: 0 auto;
    height: 50px;
    background: #4d96ca;
    width: 100px;
    border: transparent;
    box-shadow: 1px 3px 20px 3px rgb(101 101 101 / 39%);
    border-radius: 7px;
    color: white;
    transition: 1s;

    &:hover {
      background: #57819e;
    }
  }
`;
