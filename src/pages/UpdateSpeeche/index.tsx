import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/header';

import Input from '../../components/input';
import Textarea from '../../components/textarea';

import { ContainerFormAddSpeeche, InputGroup } from './style';
import Button from '../../components/button';

interface Course {
  id: string;
  name: string;
  description: string;
  videoLink: string;
  price: number;
  resume: string;
}

const AddSpeeche: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [editor, setEditor] = useState<string>();
  const { courseId } = useParams<{ courseId: string }>();
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

  // const handleEditorChange = useCallback(
  //   content => {
  //     setEditor(content);
  //     setCourse({ ...course, description: content });
  //   },
  //   [setCourse, setEditor, course],
  // );

  return (
    <>
      <Header position={2} />

      <ContainerFormAddSpeeche>
        <Form ref={formRef} onSubmit={handlAddSpeeche}>
          <h1>Editar Palestra</h1>
          <Input
            id="id"
            name="id"
            value={course.id}
            style={{ display: 'none' }}
          />
          <Input
            id="name"
            label="Nome"
            name="name"
            value={course.name}
            onChange={evt => {
              setCourse({ ...course, name: evt.target.value });
            }}
            placeholder="Nome da Palestra"
          />
          <Input
            id="videoLink"
            label="Video"
            name="videoLink"
            value={course.videoLink}
            placeholder="Video. Ex wistia.com.br/video"
            onChange={evt => {
              setCourse({ ...course, videoLink: evt.target.value });
            }}
          />

          <Input
            id="price"
            label="Preço"
            type="text"
            name="price"
            value={course.price}
          />

          <InputGroup>
            <Textarea
              label="Resumo"
              id="resume"
              name="resume"
              value={course.resume}
              onChange={evt => {
                setCourse({ ...course, resume: evt.target.value });
              }}
            />

            <Textarea
              label="Descrição"
              id="description"
              name="description"
              value={course.description}
              onChange={evt => {
                setCourse({ ...course, description: evt.target.value });
              }}
            />
          </InputGroup>

          <Button type="submit">Salvar</Button>
        </Form>
      </ContainerFormAddSpeeche>
    </>
  );
};

export default AddSpeeche;
