import styled from 'styled-components';

export const ListPostsContainer = styled.div`
  margin: auto 15vw;
  padding: 40px 0;
  max-width: 100vw;
  display: flex;
  flex-direction: column;

  > button {
    margin-top: 150px;
    width: 200px;
    margin-left: auto;
    margin-right: 30px;
    margin-bottom: 50px;

    position: inherit;
  }
`;

export const ListPostContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const TitlePost = styled.div`
  font-family: 'Roboto';
  font-size: 28px;
`;

export const PostCard = styled.div`
  background: #fff;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border: transparent;
  width: 290px;
  font-weight: 600;
  border-radius: 10px;

  img {
    border: transparent;
    height: 220px;
    width: 100%;

    border-radius: 10px 10px 0px 0px;
  }
`;

export const ContentPost = styled.div`
  padding: 15px;

  p {
    font-weight: 400;
    text-align: left;
    font-size: 16px;
    padding: 16px 0;
  }
`;

export const FooterCard = styled.div`
  background: #e4e4eb;
  display: flex;
  margin-top: auto;

  border-radius: 0 0 10px 10px;
  padding: 15px;
  height: 80px;
  button {
    height: 35px;
    border-radius: 10px;
    width: 30px;
    margin: 10px;
    background: white;
  }
`;
