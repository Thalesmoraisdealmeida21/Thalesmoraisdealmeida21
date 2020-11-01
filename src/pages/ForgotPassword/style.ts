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
  box-shadow: 1px 1px 5px rgba(240 240 245);
  border-radius: 8px;
  border: transparent;
  margin-top: 10vh;
  width: 500px;
  height: 500px;
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
  display: flex;
  flex-direction: column;
  text-align: right;
  div {
    margin: 10px 0;
    margin-top: 5px;
  }

  button {
    width: 50%;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
