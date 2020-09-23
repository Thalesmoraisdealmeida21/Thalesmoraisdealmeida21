import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import api from '../../services/api';

import Header from '../../components/header';

import Input from '../../components/input';

import { ContainerFormAddSpeeche, EditorContainer } from './style';
import Button from '../../components/button';

interface AddSpeecheDTO {
  name: string;
  videoLink: string;
  price: number;
}

const AddSpeeche: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const [editor, setEditor] = useState();

  const handlAddSpeeche = useCallback(
    async (data: AddSpeecheDTO) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          videoLink: Yup.string().required(),
          price: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/courses', data);
        toast('Curso Cadastrado com sucesso', { type: 'success' });

        history.push('/buy-speeches');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          toast('Preencha todos os campos para continuar', { type: 'error' });
        }
      }
    },
    [history],
  );

  const handleEditorChange = useCallback(content => {
    setEditor(content);
  }, []);

  return (
    <>
      <Header position={2} />

      <ContainerFormAddSpeeche>
        <Form ref={formRef} onSubmit={handlAddSpeeche}>
          <h1>Nova Palestra</h1>
          <Input
            label="Nome"
            id="name"
            name="name"
            placeholder="Nome da Palestra"
          />
          <Input
            id="videoLink"
            label="Link do Video"
            name="videoLink"
            placeholder="Video. Ex wistia.com.br/video"
          />

          <Input
            id="price"
            label="Preço"
            type="text"
            name="price"
            placeholder="Preço. Ex R$ 100.00"
          />
          <Input
            id="description"
            type="text"
            name="description"
            value={editor}
            placeholder="Preço. Ex R$ 100.00"
            style={{ display: 'none' }}
          />

          <EditorContainer>
            <Editor
              onEditorChange={handleEditorChange}
              id="description"
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
              apiKey="vrzyvdpq0s7ufjhjrhrcysrwkvwwk2tbzrpq02d7k5m1knqg"
            />
          </EditorContainer>
          <Button type="submit">Cadastrar Palestra</Button>
        </Form>
      </ContainerFormAddSpeeche>
    </>
  );
};

export default AddSpeeche;
