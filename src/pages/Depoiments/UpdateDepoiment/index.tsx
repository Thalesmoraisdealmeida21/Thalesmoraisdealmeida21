import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Form from '../FormDepoiments';
import api from '../../../services/api';

import { Container, Content, Options } from './styles';

interface ICreateDepoiment {
  id: string;
  person: string;
  depoiment: string;
}

const PageDepoiments: React.FC = () => {
  const history = useHistory();
  const { idDepoiment } = useParams<{ idDepoiment: string }>();
  const [depoiment, setDepoiment] = useState<ICreateDepoiment>(
    {} as ICreateDepoiment,
  );

  useEffect(() => {
    try {
      api.get<ICreateDepoiment>(`/depoiments/${idDepoiment}`).then(depoi => {
        setDepoiment(depoi.data);
      });
    } catch {
      toast('Ocorreu um erro :(', {
        type: 'error',
      });
    }
  }, [idDepoiment]);

  const handleUpdateDepoiment = useCallback(
    async data => {
      try {
        await api.put(`/depoiments/${idDepoiment}`, data);
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
    [history, idDepoiment],
  );
  return (
    <>
      <Header position={5} />
      <Container>
        <Content>
          <Options>
            <h1>Atualizar Depoimento</h1>
          </Options>
          <Form
            titleButton="Salvar"
            dataDepoiment={depoiment}
            sendForm={handleUpdateDepoiment}
          />
        </Content>
      </Container>
    </>
  );
};

export default PageDepoiments;
