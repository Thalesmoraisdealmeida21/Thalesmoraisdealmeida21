import React, { useCallback, useState, useRef } from 'react';
import { FiPlay, FiShoppingCart } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/header';

import Input from '../../components/input';

import { ContainerFormAddSpeeche } from './style';
import Button from '../../components/button';

interface AddSpeecheDTO {
  name: string;
  videoLink: string;
  price: number;
}

const AddSpeeche: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handlAddSpeeche = useCallback(
    async (data: AddSpeecheDTO) => {
      console.log(data);
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

  return (
    <>
      <Header position={2} />

      <ContainerFormAddSpeeche>
        <Form ref={formRef} onSubmit={handlAddSpeeche}>
          <h1>Nova Palestra</h1>
          <Input id="name" name="name" placeholder="Nome da Palestra" />
          <Input
            id="videoLink"
            name="videoLink"
            placeholder="Video. Ex wistia.com.br/video"
          />

          <Input
            id="price"
            type="text"
            name="price"
            placeholder="Preço. Ex R$ 100.00"
          />
          <Button type="submit"> Cadastrar Palestra</Button>
        </Form>
      </ContainerFormAddSpeeche>
    </>
  );
};

export default AddSpeeche;
