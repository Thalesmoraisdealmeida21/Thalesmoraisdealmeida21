import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import api from '../../services/api';

import Header from '../../components/header';

import Input from '../../components/input';

import { ContainerFormAddSpeeche, EditorContainer } from './style';
import Button from '../../components/button';

interface Course {
  id: string;
  name: string;
  description: string;
  videoLink: string;
  price: number;
}

const AddSpeeche: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editor, setEditor] = useState<string>();
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course>({} as Course);

  useEffect(() => {
    try {
      api.get<Course>(`courses/admin/${courseId}`).then(response => {
        setCourse(response.data);
      });
    } catch (err) {
      toast('Ocorreu um erro !', {
        type: 'error',
      });
    }
  }, [courseId]);
  const handlAddSpeeche = useCallback(
    async (data: Course) => {
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

        await api.put(`/courses/update/${data.id}`, data);
        toast('Curso Atualizado com sucesso', { type: 'success' });

        history.push('/buy-speeches');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          toast('Preencha todos os campos para continuar', { type: 'error' });
        }

        toast('Não foi possivel atualizar o registro', { type: 'error' });
      }
    },
    [history],
  );

  const handleEditorChange = useCallback(
    content => {
      setEditor(content);
      setCourse({ ...course, description: content });
    },
    [setCourse, setEditor, course],
  );

  return (
    <>
      <Header position={2} />

      <ContainerFormAddSpeeche>
        <Form ref={formRef} onSubmit={handlAddSpeeche}>
          <h1>Nova Palestra</h1>
          <Input
            id="id"
            name="id"
            value={course.id}
            style={{ display: 'none' }}
          />
          <Input
            id="name"
            name="name"
            value={course.name}
            onChange={evt => {
              setCourse({ ...course, name: evt.target.value });
            }}
            placeholder="Nome da Palestra"
          />
          <Input
            id="videoLink"
            name="videoLink"
            value={course.videoLink}
            placeholder="Video. Ex wistia.com.br/video"
            onChange={evt => {
              setCourse({ ...course, videoLink: evt.target.value });
            }}
          />

          <Input
            id="price"
            type="text"
            name="price"
            value={course.price}
            placeholder="Preço. Ex R$ 100.00"
            onChange={evt => {
              setCourse({ ...course, price: Number(evt.target.value) });
            }}
          />
          <Input
            id="description"
            type="text"
            name="description"
            value={course.description}
            placeholder="Preço. Ex R$ 100.00"
            style={{ display: 'none' }}
            onChange={evt => {
              setCourse({ ...course, description: evt.target.value });
            }}
          />

          <EditorContainer>
            <Editor
              onEditorChange={handleEditorChange}
              id="description"
              textareaName="description"
              tagName="description"
              initialValue={course.description}
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
