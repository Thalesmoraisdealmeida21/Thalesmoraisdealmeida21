import styled, { css } from 'styled-components';

interface ContainerProps {
  haveError: boolean;
}
export const Container = styled.div<ContainerProps>`
  padding: 15px;
  border-radius: 10px;
  background: #49728f;
  width: 100%;
  color: #fff;
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
      border: 1px solid transparent;
      border-color: #c53030;
    `}
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
