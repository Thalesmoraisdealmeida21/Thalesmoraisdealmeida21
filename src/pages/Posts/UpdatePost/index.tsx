/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { MdCloudUpload } from 'react-icons/md';
import { Form } from '@unform/web';
import { useDropzone } from 'react-dropzone';

import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import {
  ListPostContent,
  FormPostContainer,
  InputGroup,
  EditorContainer,
  DropzoneContainer,
} from './styles';

import Header from '../../../components/header';
import Input from '../../../components/input';
import api from '../../../services/api';

interface Post {
  id: string;
  name: string;
  resume: string;
  category: string;
  description: string;
  image: string;
  facebookLink: string;
}

interface Image {
  image: {
    url: string;
    file: string;
  };
}

interface Props {
  onFileUploaded: (file: File) => void;
}
const ViewPost: React.FC = () => {
  const [editor, setEditor] = useState();
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [post, setPost] = useState<Post>({} as Post);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getPostData(): Promise<void> {
      const response = await api.get<Post>(`/posts/${id}`);

      setPost(response.data);
      setSelectedFileUrl(post.image);
    }

    getPostData();
  }, [id, post.image]);

  const history = useHistory();

  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0] as File;
    const data = new FormData();

    data.append('postImage', file, file.name);
    try {
      const response = await api.patch<Image>('/posts', data);

      setSelectedFileUrl(String(response.data.image.file));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleEditorChange = useCallback(content => {
    setEditor(content);
  }, []);

  const handleUpdatePost = useCallback(
    async (data: Post) => {
      console.log(data);
      try {
        await api.put(`/posts/${data.id}`, data);
        toast('Registro atualizado com sucesso !', {
          type: 'success',
        });
        history.push('/posts');
      } catch {
        toast('Ocorreu um erro ao salvar o novo post', {
          type: 'error',
        });
      }
    },
    [history],
  );

  return (
    <>
      <Header position={4} />
      <FormPostContainer>
        <Form onSubmit={handleUpdatePost}>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {selectedFileUrl ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/files/${selectedFileUrl}`}
                alt="postimg"
              />
            ) : (
              <div>
                <p>Capa da Públicação</p>
                <MdCloudUpload size={40} color="#27516f" />
              </div>
            )}
          </DropzoneContainer>
          <Input
            placeholder="Escreva aqui o nome do artigo"
            name="image"
            value={selectedFileUrl}
            id="image"
            style={{ display: 'none' }}
          />
          <Input name="id" value={post.id} style={{ display: 'none' }} />
          <InputGroup>
            <Input
              label="Nome da públicação"
              placeholder="Escreva aqui o nome do artigo"
              name="name"
              value={post.name}
              onChange={evt => {
                setPost({ ...post, name: evt.target.value });
              }}
              id="name"
            />
            <Input
              label="Categoria"
              placeholder="Ex. Educação, Ensino, Alunos"
              name="category"
              value={post.category}
              onChange={evt => {
                setPost({ ...post, category: evt.target.value });
              }}
              id="category"
            />
          </InputGroup>
          <Input
            maxLength={200}
            label="Resumo"
            placeholder="Escreva um resumo de até 200 characteres"
            name="resume"
            value={post.resume}
            id="resume"
            onChange={evt => {
              setPost({ ...post, resume: evt.target.value });
            }}
          />
          <Input
            label="Facebook"
            name="facebookLink"
            id="facebookLink"
            value={post.facebookLink}
          />
          <Input
            name="description"
            id="description"
            value={editor || post.description}
            style={{ display: 'none' }}
          />
          {console.log(post.description)}
          <EditorContainer>
            <Editor
              onEditorChange={handleEditorChange}
              apiKey="vrzyvdpq0s7ufjhjrhrcysrwkvwwk2tbzrpq02d7k5m1knqg"
              initialValue={post.description}
              init={{
                branding: false,
                plugins: ['fullscreen', 'preview', 'link'],
                default_link_target: '_blank',
                toolbar:
                  'undo | remake link fullscreen bold italic fontsizeselect forecolor backcolor ',
                fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                language: 'pt_BR',
              }}
            />
          </EditorContainer>
          <Button type="submit" variant="contained">
            Salvar e Públicar
          </Button>
        </Form>
        <ListPostContent />
      </FormPostContainer>
    </>
  );
};
export default ViewPost;
