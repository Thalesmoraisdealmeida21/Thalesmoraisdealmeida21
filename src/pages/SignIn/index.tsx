import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiKey } from 'react-icons/fi';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { Container, Card, FormStyle, AnimationContainer } from './style';
import logo from '../../assets/LogoRounded.png';

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
      <AnimationContainer>
        <Card>
          <img src={logo} alt="Flroescer" />

          <h2>Login</h2>

          <Form onSubmit={handleAuthenticate}>
            <FormStyle>
              <Input icon={FiMail} name="email" placeholder="E-mail" />
              <Input
                icon={FiKey}
                name="password"
                type="password"
                placeholder="Senha"
              />
              <Link to="forgot-password">Esqueceu sua senha ?</Link>
              <Button type="submit">Login</Button>
            </FormStyle>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </Card>
      </AnimationContainer>
    </Container>
  );
};

export default SignIn;
