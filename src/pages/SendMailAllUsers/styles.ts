import styled from 'styled-components';

export const SendMailContainer = styled.div`
  color: black;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  form {
    display: flex;
    padding: 0 25vw;
    margin-top: 100px;
    flex-direction: column;
    span {
      padding: 8px;
      font-size: 18px;
    }

    button {
      margin-top: 30px;
    }
  }
`;
