import styled from 'styled-components';

export const ContainerFormAddSpeeche = styled.div`
  margin: auto 10vw;
  position: inherit;

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
    margin-top: 200px;
    border-radius: 20px;
    height: 700px;
    display: flex;
    flex-direction: column;

    button {
      width: 20vw;
      align-items: center;
      align-content: center;
      text-align: center;

      margin: 0 auto;
      margin-top: 60px;
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

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
