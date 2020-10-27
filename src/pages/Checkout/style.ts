import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  h1 {
    padding: 50px;
    font-size: 48px;
  }

  button {
    height: 60px;
    background: #4d96cb;
    padding: 10px;
    margin-top: 24px;
    border: transparent;
    width: 220px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 75%;
    border-radius: 10px;
  }
`;
export const CardContainerCheckout = styled.div`
  display: flex;
  margin-top: 150px;
  background: #fff;
  padding: 30px;
  form {
    width: 100%;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;

  select {
    width: 100%;
    padding: 10px;
    height: 50px;
    border: transparent;
    border-radius: 8px;
    background: #f3f3f3;
    margin: 10px;
  }
`;

export const DetailsPayment = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  strong {
    color: green;
    font-size: 2rem;
  }

  button {
    margin-left: 40%;
  }
`;

export const ContainerProfile = styled.div`
  padding: 0 20vw;
  width: 100vw;
  display: flex;
`;

export const ContentProfile = styled.div`
  width: 100%;

  form {
    background: white;
    padding: 30px;
    width: 100%;

    button {
      width: 100%;
      padding: 10px;
      margin-top: 24px;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.h2`
  font-size: 24px;
  font-weight: lighter;
  padding: 10px;
`;

export const PaymentsMethod = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }

  span {
    margin: 2px;
  }
`;
