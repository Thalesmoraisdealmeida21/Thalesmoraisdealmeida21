import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/header';

import Input from '../../components/input';
import Textarea from '../../components/textarea';

import { ContainerFormAddSpeeche, InputGroup } from './style';
import Button from '../../components/button';

interface AddSpeecheDTO {
  name: string;
  videoLink: string;
  price: number;
}

const AddSpeeche: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  // const [editor, setEditor] = useState();

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

  // const handleEditorChange = useCallback(content => {
  //   setEditor(content);
  // }, []);

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

          <InputGroup>
            <Textarea label="Resumo" id="resume" name="resume" />

            <Textarea label="Descrição" id="description" name="description" />
          </InputGroup>

          <Button type="submit">Cadastrar Palestra</Button>
        </Form>
      </ContainerFormAddSpeeche>
    </>
  );
};

export default AddSpeeche;
