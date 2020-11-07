import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/header';
import Form from '../FormDepoiments';
import api from '../../../services/api';

import { Container, Content, Options } from './styles';

interface ICreateDepoiment {
  person: string;
  depoiment: string;
}

const PageDepoiments: React.FC = () => {
  const history = useHistory();
  const handlCreateDepoiment = useCallback(
    async data => {
      try {
        await api.post('/depoiments', data);
        toast('Registro salvo com sucesso', {
          type: 'success',
        });

        history.push('/depoiments');
      } catch {
        toast('Ocorreu um erro :(', {
          type: 'warning',
        });
      }
    },
    [history],
  );
  return (
    <>
      <Header position={5} />
      <Container>
        <Content>
          <Options>
            <h1>Novo Depoimento</h1>
          </Options>
          <Form titleButton="Salvar" sendForm={handlCreateDepoiment} />
        </Content>
      </Container>
    </>
  );
};

export default PageDepoiments;
