import styled from 'styled-components';

export const ContainerUsers = styled.div`
  color: black;
  padding: 100px;

  div:first-child {
    margin-top: 80px;
    h1 {
      padding: 0 20px;
    }
  }
`;

export const TableHeaderContent = styled.div`
  display: flex;
  flex-direction: row;

  button {
    height: 40px;
    margin-left: auto;
    margin-right: 64px;
    position: initial;
  }
`;

export const ContainerUser = styled.div`
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  input {
    padding: 15px;
    border: transparent;
    width: 100%;
    border-radius: 4px;
    background: #fdfdfd;
    box-shadow: 1px 1px 3px 0px;
    margin-top: 16px;
  }
  form {
    display: flex;
    flex-direction: column;
  }

  button {
    width: 200px;
    margin-left: auto;
    margin-top: 30px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;

  input:first-child {
    margin-right: 16px;
  }
`;
