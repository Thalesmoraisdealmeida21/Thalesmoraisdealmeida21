import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { Container, Card, FormStyle } from './style';
import logo from '../../assets/logo.svg';

import { useAuth } from '../../hooks/AuthContext';

import Input from '../../components/inputLogin';
import Button from '../../components/button';

interface IAuthenticateData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const handleAuthenticate = useCallback(
    async (data: IAuthenticateData) => {
      try {
        await signIn(data);
        toast('Usuário autenticado com sucesso (:', {
          type: 'success',
        });
      } catch (err) {
        console.log(err);
        toast('Usuário ou senha incorretos :(', {
          type: 'error',
        });
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Card>
        <img src={logo} alt="Flroescer" />

        <h2>Login</h2>

        <Form onSubmit={handleAuthenticate}>
          <FormStyle>
            <Input name="email" placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Senha" />
            <Button type="submit">Login</Button>
          </FormStyle>
        </Form>

        <Link to="signup">
          <FiLogIn />
          Criar Conta
        </Link>
      </Card>
    </Container>
  );
};

export default SignIn;
