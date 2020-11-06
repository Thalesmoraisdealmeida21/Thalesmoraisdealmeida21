import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerFormAddSpeeche = styled.div`
  margin: auto 10vw;
  position: static;

  padding: 20px 0;
  max-width: 100vw;

  span {
    text-align: left;
  }

  h1 {
    padding: 30px;

    font-size: 48px;
  }

  form {
    padding: 30px;
    background: #fff;
    position: unset;
    margin-top: 200px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    height: 700px;

    button {
      margin-top: 130px;
      width: 20vw;
      height: 50px;
      margin: 0 auto;
      margin-top: 30px;
      align-items: center;
      align-content: center;
      text-align: center;
    }
  }
`;

export const EditorContainer = styled.div`
  background: #e8e8e8;
  height: 100px;
  border-radius: 10px;
  color: black;
  position: relative;
`;
