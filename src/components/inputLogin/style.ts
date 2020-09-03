import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px;
  border-radius: 10px;
  background: #49728f;
  width: 100%;
  color: #fff;

  input {
    background: transparent;
    border: transparent;
    width: 100%;
    color: #fff;

    ::-webkit-input-placeholder {
      color: #b8b8b8;
    }
  }
`;
