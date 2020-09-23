import styled from 'styled-components';

export const ContainerProfile = styled.div`
  padding: 0 20vw;
  width: 100vw;
  display: flex;
`;

export const ContentProfile = styled.div`
  margin-top: 170px;
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

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
