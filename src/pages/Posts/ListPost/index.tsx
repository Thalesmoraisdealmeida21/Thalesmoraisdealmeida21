import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {
  ListPostContent,
  ContentPost,
  FooterCard,
  ListPostsContainer,
  PostCard,
  TitlePost,
} from './styles';

import Header from '../../../components/header';
import api from '../../../services/api';

interface Post {
  id: string;
  name: string;
  resume: string;
  image: string;
}

const ListPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function getPosts(): Promise<void> {
      const response = await api.get<Post[]>('/posts');

      setPosts(response.data);
    }
    try {
      getPosts();
    } catch {
      toast('Ocorreu um erro ao trazer os dados das públicações');
    }
  }, []);

  const handleDeletePost = useCallback(
    async id => {
      alert('Realmente deseja excluir este post');

      try {
        await api.delete(`/posts/${id}`);

        const postsAfterDelete = posts.filter(post => {
          return post.id !== id;
        });

        setPosts(postsAfterDelete);

        toast('Registro Excluído com sucesso !', {
          type: 'success',
        });
      } catch {
        toast('Ocorreu um erro ao excluir o registro ;(', {
          type: 'error',
        });
      }
    },
    [posts],
  );
  return (
    <>
      <Header position={4} />

      <ListPostsContainer>
        <Button
          variant="contained"
          onClick={() => {
            history.push('/posts/new');
          }}
          color="primary"
        >
          Nova Públicação
        </Button>
        <ListPostContent>
          {posts.map(post => {
            return (
              <PostCard>
                <img alt="Imagem" src={post.image} />
                <ContentPost>
                  <TitlePost>{post.name}</TitlePost>
                  <p>{post.resume}</p>
                </ContentPost>

                <FooterCard>
                  <Button
                    onClick={() => {
                      handleDeletePost(post.id);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </FooterCard>
              </PostCard>
            );
          })}
        </ListPostContent>
      </ListPostsContainer>
    </>
  );
};
export default ListPost;
