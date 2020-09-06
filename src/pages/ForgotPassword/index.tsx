import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiLogIn, FiArrowDownLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Container, Card, FormStyle } from './style';
import Button from '../../components/button';
import Input from '../../components/inputLogin';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
  const handleForgotPassword = useCallback(async (email: string) => {
    try {
      await api.post('auth/send-forgot-password', email);

      toast('E-mail de recuperação de senha enviado com sucesso !!', {
        type: 'success',
      });
    } catch (err) {
      toast('Ocorreu um erro ao tentar recuperar a senha. Tente novamente', {
        type: 'error',
      });
    }
  }, []);

  return (
    <Container>
      <Card>
        <img src={logo} alt="Flroescer" />

        <h2>Recuperar Senha</h2>

        <Form onSubmit={handleForgotPassword}>
          <FormStyle>
            <Input name="email" placeholder="E-mail" />
            <Button type="submit">Login</Button>
          </FormStyle>
        </Form>

        <Link to="signup">
          <FiArrowDownLeft />
          Voltar para o Login
        </Link>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
