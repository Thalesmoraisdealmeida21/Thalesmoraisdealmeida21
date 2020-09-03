import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import { FiLogOut, FiCornerDownLeft } from 'react-icons/fi';
import { Container, Card, FormStyle, FormGroup } from './style';
import logo from '../../assets/logo.svg';

import Input from '../../components/inputLogin';
import Button from '../../components/button';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  telephone: string;
  cnpj: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        await api.post('/users', data);
        toast('Usuário registrado com sucesso', {
          type: 'info',
        });

        history.push('/');
      } catch (err) {
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
        <Form onSubmit={handleSubmit}>
          <FormStyle>
            <Input name="name" placeholder="Nome/Razão Social" />

            <Input name="cnpj" placeholder="CNPJ" />
            <FormGroup>
              <Input name="email" placeholder="E-mail" />
              <Input name="telephone" placeholder="Telefone" />
            </FormGroup>

            <Input name="password" placeholder="Senha" />
            <Button type="submit">Criar Conta</Button>
          </FormStyle>
        </Form>

        <Link to="/">
          <FiCornerDownLeft />
          Foltar para o Login
        </Link>
      </Card>
    </Container>
  );
};

export default SignUp;
