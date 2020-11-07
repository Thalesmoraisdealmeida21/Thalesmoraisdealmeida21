import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 15vw;
`;

export const DepoimentsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100vw;
`;

export const Content = styled.div`
  margin-top: 250px;
  position: initial;

  button {
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-left: auto;
    margin-right: 50px;
    padding: 10px;
    color: #fff;
    border: transparent;
    background: #4d96ca;
    border-radius: 8px;
    transition: 1s;
    &:hover {
      background: #4d4ac9;
    }
  }
`;
export const Depoiment = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #fff;
  padding: 15px;
  border: transparent;
  border-radius: 8px;
  box-shadow: 1px 1px 5px #dcdada;
  margin: 15px;
  h1 {
    padding: 15px 0;
  }
`;

export const ActionsDepoiment = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid silver;
  padding: 10px;
  text-align: right;
  margin-left: auto;

  button {
    height: 40px;
    width: 40px;
    color: white;
    margin: 0 5px;

    background: #4d96ca;
    border-radius: 8px;
    border: transparent;
    transition: 1s;

    &:hover {
      background: black;
    }
  }
`;
