import styled, { css } from 'styled-components';

interface ContainerProps {
  haveError: boolean;
}

export const ContainerInputs = styled.div`
  width: 100%;
  padding: 8px;

  span {
    font-size: 16px;
  }
`;
export const Container = styled.div<ContainerProps>`
  padding: 15px;
  border-radius: 5px;
  background: #f3f3f3;
  width: 100%;
  margin-top: 8px;

  border-color: #c53030;
  display: flex;

  div {
    width: 100%;
  }

  svg {
    margin-right: 8px;

    ${props =>
      props.haveError &&
      css`
        color: #c53030;
      `}
  }

  ${props =>
    props.haveError &&
    css`
      border: 1px solid;
      border-color: #c53030;
    `}
  input {
    background: transparent;
    border: transparent;
    width: 100%;
    color: #303030;

    ::-webkit-input-placeholder {
      color: #939393;
    }
  }
`;
