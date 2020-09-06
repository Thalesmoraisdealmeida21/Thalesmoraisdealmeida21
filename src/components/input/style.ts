import styled, { css } from 'styled-components';

interface ContainerProps {
  haveError: boolean;
}
export const Container = styled.div<ContainerProps>`
  padding: 15px;
  border-radius: 5px;
  background: #e8e8e8;
  width: 100%;

  border-color: #c53030;
  display: flex;

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
