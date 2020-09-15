import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import { FiCornerDownLeft, FiUser, FiKey, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Container, Card, FormStyle } from './style';
import logo from '../../assets/LogoRounded.png';

import Input from '../../components/inputLogin';
import Button from '../../components/button';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  telephone: string;
  cnpj: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        toast('Usuário registrado com sucesso', {
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          if (errors?.name) {
            toast(`${errors?.name} `, {
              type: 'error',
            });
          }

          if (errors?.email) {
            toast(`${errors?.email} `, {
              type: 'error',
            });
          }

          if (errors?.password) {
            toast(`${errors?.password} `, {
              type: 'error',
            });
          }

          return;
        }
        toast('Não foi possivel criar ok usuário ;( Contate o suporte !', {
          type: 'error',
        });
      }
    },
    [history],
  );
  return (
    <Container>
      <Card>
        <img src={logo} alt="Flroescer" />

        <h2>Criar Conta</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormStyle>
            <Input icon={FiUser} name="name" placeholder="Nome/Razão Social" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Input
              icon={FiKey}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Criar Conta</Button>
          </FormStyle>
        </Form>

        <Link to="/">
          <FiCornerDownLeft />
          Voltar para o Login
        </Link>
      </Card>
    </Container>
  );
};

export default SignUp;
