import styled from 'styled-components';

export const DropzoneContainer = styled.div`
  height: 250px;
  border: 3px solid #4d96ca82;
  text-align: center;
  background: #4d96ca82;
  cursor: pointer;
  border-style: dotted;

  p {
    opacity: 1;
    margin-top: 100px;
    color: #27516f;
  }

  img {
    height: 250px;
    width: 100%;
  }
`;

export const FormPostContainer = styled.div`
  margin: auto 15vw;
  padding: 40px 0;
  max-width: 100vw;
  display: flex;
  flex-direction: column;

  > button {
    margin-top: 150px;
    width: 200px;
    margin-left: auto;
    margin-right: 60px;
    margin-bottom: 50px;
  }

  form {
    background: #fff;
    padding: 30px;
    margin-top: 150px;

    button {
      text-align: center;
      margin-left: 40%;
      margin-right: 40%;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
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

export const EditorContainer = styled.div`
  /* background: #f3f3f3; */
  height: 300px;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
`;
export const PostCard = styled.div`
  background: #fff;
  margin: 10px;
  border: transparent;
  width: 300px;
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
    padding: 16px 0;
  }
`;

export const FooterCard = styled.div`
  background: #e4e4eb;

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
