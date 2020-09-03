import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

export const Card = styled.div`
  background: #6299c0;
  margin: 0 auto;
  text-align: center;
  max-width: 100%;
  box-shadow: 1px 1px 15px black;
  border-radius: 15px;
  border: transparent;
  margin-top: 20vh;
  min-height: 400px;
  img {
    max-width: 60%;
  }

  h2 {
    color: #fff;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: white;
    transition: 0.5s;

    &:hover {
      color: black;
    }
  }

  svg {
    margin-right: 8px;
  }
`;
export const FormStyle = styled.div`
  padding: 20px;

  div {
    margin: 10px 0;
    margin-top: 5px;
  }

  button {
    width: 50%;
    border-radius: 10px;
  }
`;
