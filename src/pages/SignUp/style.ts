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

  @media (max-width: 1030px) {
    width: 100vw;
    margin-top: 0;
    height: 100vh;
    border-radius: 0px;
  }

  img {
    max-width: 150px;
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;

  div {
    & + div {
      margin-left: 10px;
    }
  }
`;
