import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { MdCloudUpload } from 'react-icons/md';
import { Form } from '@unform/web';
import { useDropzone } from 'react-dropzone';

import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
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
  const [fileName, setFileName] = useState<string>();

  const history = useHistory();

  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0] as File;
    const data = new FormData();

    data.append('postImage', file, file.name);

    const response = await api.patch<Image>('/posts', data);
    setSelectedFileUrl(String(response.data.image.url));
    setFileName(response.data.image.file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleEditorChange = useCallback(content => {
    setEditor(content);
  }, []);

  const handleAddPost = useCallback(
    async (data: Post) => {
      try {
        await api.post('/posts', data);
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
        <Form onSubmit={handleAddPost}>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {selectedFileUrl ? (
              <div>
                <img src={selectedFileUrl} alt="postimg" />
              </div>
            ) : (
              <div>
                <p>Capa da Públicação</p>
                <MdCloudUpload size={40} color="#27516f" />
              </div>
            )}
          </DropzoneContainer>
          <Input
            name="image"
            value={fileName}
            id="image"
            style={{ display: 'none' }}
          />
          <InputGroup>
            <Input
              label="Nome da públicação"
              placeholder="Escreva aqui o nome do artigo"
              name="name"
              id="name"
            />
            <Input
              label="Categoria"
              placeholder="Ex. Educação, Ensino, Alunos"
              name="category"
              id="category"
            />
          </InputGroup>
          <Input
            maxLength={200}
            label="Resumo"
            placeholder="Escreva um resumo de até 200 characteres"
            name="resume"
            id="resume"
          />
          <Input label="Facebook Post" name="facebookLink" id="facebookLink" />
          <Input
            name="description"
            id="description"
            value={editor}
            style={{ display: 'none' }}
          />

          <EditorContainer>
            <Editor
              onEditorChange={handleEditorChange}
              apiKey="vrzyvdpq0s7ufjhjrhrcysrwkvwwk2tbzrpq02d7k5m1knqg"
              initialValue="<p>Digite seu artigo aqui !</p>"
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
