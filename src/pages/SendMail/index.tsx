/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/header';
import api from '../../services/api';

import { SendMailContainer } from './styles';
import Input from '../../components/input';

interface SendMailDTOs {
  subject: string;
}

interface UserDTO {
  name: string;
  email: string;
  id: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserDTO>();
  const formRef = useRef<FormHandles>(null);
  const [editor, setEditor] = useState();

  const { uuidUser } = useParams();

  useEffect(() => {
    api.get<UserDTO>(`/users/${uuidUser}`).then(response => {
      setUser(response.data);
    });
  }, [uuidUser]);

  const sendMail = useCallback(
    async (data: SendMailDTOs) => {
      console.log(data);
      try {
        await api.post('/users/sendmail', {
          ...data,
          to: uuidUser,
        });

        toast('E-mail enviado com sucesso', {
          type: 'success',
        });
      } catch {
        toast('Ocorreu um erro ao enviar o e-mail', {
          type: 'error',
        });
      }
    },

    [uuidUser],
  );

  const handleEditorChange = useCallback(content => {
    setEditor(content);
  }, []);

  return (
    <>
      <Header position={3} />
      <SendMailContainer>
        <h1>Enviar E-mai</h1>
        <Form ref={formRef} onSubmit={sendMail}>
          <span>Para</span>
          <Input id="to" name="to" type="text" disabled value={user?.email} />
          <span>Assunto</span>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="Digite o Assunto"
          />

          <Input
            id="html"
            type="text"
            name="html"
            value={editor}
            placeholder="Preço. Ex R$ 100.00"
            style={{ display: 'none' }}
          />

          <span>Seu e-mail</span>
          <Editor
            apiKey="vrzyvdpq0s7ufjhjrhrcysrwkvwwk2tbzrpq02d7k5m1knqg"
            id="email"
            onEditorChange={handleEditorChange}
            textareaName="description"
            tagName="description"
            initialValue="<p>Digite a descrição da palestra</p>"
            init={{
              selector: 'textarea',
              branding: false,
              plugins: ['fullscreen', 'preview', 'link'],
              default_link_target: '_blank',
              toolbar:
                'undo | remake link fullscreen bold italic fontsizeselect forecolor backcolor ',
              fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
              language: 'pt_BR',
            }}
          />

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Form>
      </SendMailContainer>
    </>
  );
};

export default User;
